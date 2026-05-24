import './PriorityBadge.scss';

const LABELS = { Alta: 'Alta', Media: 'Média', Baixa: 'Baixa' };

export const PriorityBadge = ({ value }) => (
  <span className={`priority-badge priority-badge--${value?.toLowerCase()}`}>
    {LABELS[value] || value}
  </span>
);
