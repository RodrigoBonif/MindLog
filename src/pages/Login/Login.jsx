import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import mindlogLogo from '../../assets/mindlog.png';
import './Login.scss';

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: '', senha: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.login) newErrors.login = 'Campo obrigatório';
    if (!form.senha) newErrors.senha = 'Campo obrigatório';
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    // Simulate auth
    const users = JSON.parse(localStorage.getItem('ml_users') || '[]');
    const user = users.find(u => u.login === form.login && u.senha === form.senha);
    if (!user) return setErrors({ senha: 'Login ou senha incorretos' });

    localStorage.setItem('ml_current_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <AuthLayout variant="login">
      <form className="login" onSubmit={handleSubmit}>
        <img src={mindlogLogo} alt="MindLog" className="login__logo" />

        <Input
          label="Login"
          value={form.login}
          onChange={e => setForm({ ...form, login: e.target.value })}
          error={errors.login}
          placeholder="seu_usuario"
        />
        <Input
          label="Senha"
          type="password"
          value={form.senha}
          onChange={e => setForm({ ...form, senha: e.target.value })}
          error={errors.senha}
          placeholder="••••••••"
        />

        <Button type="submit" fullWidth>Entrar</Button>

        <span className="divider">OU</span>

        <Button variant="secondary" fullWidth onClick={() => navigate('/register')}>
          Criar conta
        </Button>
      </form>
    </AuthLayout>
  );
};
