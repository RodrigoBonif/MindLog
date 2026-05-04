import './Input.scss';

export const Input = ({ label, type = 'text', error, value, onChange, placeholder, ...rest }) => {
  return (
    <div className="input">
      {label && <label>{label}</label>}
      <input
        type={type}
        className={error ? 'error' : ''}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
