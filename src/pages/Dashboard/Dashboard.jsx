import { useState, useMemo } from 'react';
import { CardModal } from '../../components/CardModal/CardModal';
import { PriorityBadge } from '../../components/PriorityBadge/PriorityBadge';
import { Button } from '../../components/Button/Button';
import './Dashboard.scss';

const genId = () => Math.random().toString(36).slice(2);

const STORAGE_KEY = (user) => `ml_cards_${user.login}`;

const loadCards = (user) => JSON.parse(localStorage.getItem(STORAGE_KEY(user)) || '[]');
const saveCards = (user, cards) => localStorage.setItem(STORAGE_KEY(user), JSON.stringify(cards));

export const Dashboard = ({ user, onLogout }) => {
  const [cards, setCards] = useState(() => loadCards(user));
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'create' | { ...card }
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ prioridade: null, prazo: null });
  const [profileOpen, setProfileOpen] = useState(false);
  const [editLoginModal, setEditLoginModal] = useState(false);
  const [newName, setNewName] = useState(user.nome);

  const updateCards = (next) => { setCards(next); saveCards(user, next); };

  const handleCreate = (form) => {
    const next = [...cards, { ...form, id: genId() }];
    updateCards(next);
    setModal(null);
  };

  const handleSave = (form) => {
    const next = cards.map(c => c.id === form.id ? form : c);
    updateCards(next);
    setModal(null);
  };

  const handleDelete = (id) => {
    updateCards(cards.filter(c => c.id !== id));
    setModal(null);
  };

  const filtered = useMemo(() => {
    let result = cards;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c => c.titulo.toLowerCase().includes(q) || (c.descricao || '').toLowerCase().includes(q));
    }
    if (filters.prioridade) result = result.filter(c => c.prioridade === filters.prioridade);
    return result;
  }, [cards, search, filters]);

  const clearFilters = () => setFilters({ prioridade: null, prazo: null });
  const hasFilters = filters.prioridade || filters.prazo;

  const handleSaveName = () => {
    const users = JSON.parse(localStorage.getItem('ml_users') || '[]');
    const idx = users.findIndex(u => u.login === user.login);
    if (idx >= 0) { users[idx].nome = newName; localStorage.setItem('ml_users', JSON.stringify(users)); }
    const updated = { ...user, nome: newName };
    localStorage.setItem('ml_current_user', JSON.stringify(updated));
    setEditLoginModal(false);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            placeholder="Pesquisar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="dashboard__controls">
          <div className="dashboard__filter-wrap">
            <button
              className={`dashboard__filter-btn${hasFilters ? ' active' : ''}`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filtros
            </button>
            {filterOpen && (
              <div className="dashboard__filter-menu">
                <p className="filter-label">Prioridade</p>
                {['Alta', 'Media', 'Baixa'].map(p => (
                  <button
                    key={p}
                    className={`filter-option${filters.prioridade === p ? ' selected' : ''}`}
                    onClick={() => setFilters({ ...filters, prioridade: filters.prioridade === p ? null : p })}
                  >
                    {p === 'Media' ? 'Média' : p}
                  </button>
                ))}
                <hr />
                <button className="filter-clear" onClick={clearFilters}>Limpar filtros</button>
              </div>
            )}
          </div>

          <button
            className="dashboard__avatar"
            onClick={() => setProfileOpen(!profileOpen)}
            title={user.nome}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>

          {profileOpen && (
            <div className="dashboard__profile-menu">
              <div className="profile-info">
                <strong>{user.nome}</strong>
                <span>@{user.login}</span>
              </div>
              <hr />
              <button onClick={() => { setEditLoginModal(true); setProfileOpen(false); }}>
                Editar perfil
              </button>
              <button className="logout" onClick={onLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>

      {/* Cards grid */}
      <div className="dashboard__grid">
        {filtered.map(card => (
          <div key={card.id} className="card" onClick={() => setModal(card)}>
            <div className="card__hover-actions">
              <button className="card__icon-btn" onClick={e => { e.stopPropagation(); setModal(card); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button className="card__icon-btn card__icon-btn--delete" onClick={e => { e.stopPropagation(); handleDelete(card.id); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
            <h3 className="card__title">{card.titulo}</h3>
            <div className="card__footer">
              <PriorityBadge value={card.prioridade} />
              {card.prazo && <span className="card__date">{card.prazo}</span>}
            </div>
          </div>
        ))}

        {/* Add card button */}
        <button className="card card--add" onClick={() => setModal('create')}>
          <span>+</span>
        </button>
      </div>

      {/* Modals */}
      {modal === 'create' && (
        <CardModal onSave={handleCreate} onClose={() => setModal(null)} />
      )}
      {modal && modal !== 'create' && (
        <CardModal
          card={modal}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModal(null)}
        />
      )}

      {/* Edit profile modal */}
      {editLoginModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setEditLoginModal(false)}>
          <div className="edit-profile-modal">
            <h2>Editar perfil</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>NOME</label>
              <input
                className="edit-profile-modal__input"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setEditLoginModal(false)}>Cancelar</Button>
              <Button onClick={handleSaveName}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
