import './Button.scss';

export const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled, fullWidth }) => {
  return (
    <button
      className={`btn btn--${variant}${fullWidth ? ' btn--full' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
