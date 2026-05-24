import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { login } from '../../services/auth';
import mindlogLogo from '../../assets/mindlog.png';
import './Login.scss';

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: '', senha: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.login) newErrors.login = 'Campo obrigatório';
    if (!form.senha) newErrors.senha = 'Campo obrigatório';
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    setLoading(true);
    try {
      const user = await login({ login: form.login, senha: form.senha });
      onLogin(user);
    } catch (err) {
      setErrors({ senha: err.message || 'Login ou senha incorretos' });
    } finally {
      setLoading(false);
    }
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

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <span className="divider">OU</span>

        <Button variant="secondary" fullWidth onClick={() => navigate('/register')}>
          Criar conta
        </Button>
      </form>
    </AuthLayout>
  );
};
