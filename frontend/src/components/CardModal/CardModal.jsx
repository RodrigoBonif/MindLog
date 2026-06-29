import { useState, useEffect } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './CardModal.scss';

const PRIORITIES = ['Alta', 'Media', 'Baixa'];

export const CardModal = ({ card, onSave, onDelete, onToggleConcluido, onClose }) => {
  const isEdit = !!card?.id;
  const isConcluido = !!card?.concluido;
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    prazo: '',
    prioridade: 'Media',
    ...card,
  });
  const [errors, setErrors] = useState({});
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const validate = () => {
    const e = {};
    if (!form.titulo.trim()) e.titulo = 'Campo obrigatório';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    onSave(form);
  };

  const priorityColor = { Alta: '#ef4444', Media: '#f59e0b', Baixa: '#22c55e' };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card-modal">
        <div className="card-modal__header">
          <input
            className="card-modal__title-input"
            value={form.titulo}
            onChange={e => setForm({ ...form, titulo: e.target.value })}
            placeholder="Título do card"
          />
          {errors.titulo && <span className="card-modal__error">{errors.titulo}</span>}
          <div className="card-modal__meta">
            <input
              type="text"
              className="card-modal__date-input"
              value={form.prazo}
              onChange={e => setForm({ ...form, prazo: e.target.value })}
              placeholder="dd/mm/aaaa"
            />
            <div className="card-modal__priority-wrap">
              <button
                className="card-modal__priority-btn"
                onClick={() => setShowPriorityMenu(!showPriorityMenu)}
              >
                <span className="card-modal__priority-arrow">▼</span>
                <span style={{ color: priorityColor[form.prioridade] }}>{form.prioridade}</span>
              </button>
              {showPriorityMenu && (
                <div className="card-modal__priority-menu">
                  {PRIORITIES.map(p => (
                    <button
                      key={p}
                      className="card-modal__priority-option"
                      style={{ color: priorityColor[p] }}
                      onClick={() => { setForm({ ...form, prioridade: p }); setShowPriorityMenu(false); }}
                    >
                      {p === 'Media' ? 'Média' : p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <textarea
          className="card-modal__description"
          value={form.descricao}
          onChange={e => setForm({ ...form, descricao: e.target.value })}
          placeholder="Descrição do card"
        />

        <div className="card-modal__actions">
          {isEdit && (
            <Button variant="danger" onClick={() => onDelete(card.id)}>
              Excluir card
            </Button>
          )}
          {isEdit && onToggleConcluido && (
            <Button
              variant="secondary"
              onClick={() => { onToggleConcluido(card, !isConcluido); onClose(); }}
            >
              {isConcluido ? 'Reabrir tarefa' : 'Marcar como concluído'}
            </Button>
          )}
          <Button onClick={handleSave}>
            {isEdit ? 'Salvar alterações' : 'Criar card'}
          </Button>
        </div>
      </div>
    </div>
  );
};
