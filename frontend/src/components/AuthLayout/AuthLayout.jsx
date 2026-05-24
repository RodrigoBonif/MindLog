import './AuthLayout.scss';

export const AuthLayout = ({ children, variant = 'login' }) => {
  return (
    <div className={`auth auth--${variant}`}>
      <div className="auth__form">
        {children}
      </div>
      <div className="auth__visual" />
    </div>
  );
};
