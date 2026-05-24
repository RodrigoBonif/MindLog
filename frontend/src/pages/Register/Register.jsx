import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { register } from '../../services/auth';
import mindlogLogo from '../../assets/mindlog.png';
import './Register.scss';

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: '', nome: '', senha: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.login) newErrors.login = 'Campo obrigatório';
    if (!form.nome) newErrors.nome = 'Campo obrigatório';
    if (!form.senha || form.senha.length < 6) newErrors.senha = 'Mínimo 6 caracteres';
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    setLoading(true);
    try {
      await register({ login: form.login, nome: form.nome, senha: form.senha });
      navigate('/');
    } catch (err) {
      // Backend returns "Login já está em uso" for duplicate logins
      if (err.message?.toLowerCase().includes('login')) {
        setErrors({ login: err.message });
      } else {
        setErrors({ senha: err.message || 'Erro ao criar conta' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout variant="register">
      <form className="register" onSubmit={handleSubmit}>
        <img src={mindlogLogo} alt="MindLog" className="register__logo" />

        <Input
          label="Login"
          value={form.login}
          onChange={e => setForm({ ...form, login: e.target.value })}
          error={errors.login}
          placeholder="seu_usuario"
        />
        <Input
          label="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          error={errors.nome}
          placeholder="Seu nome"
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
          {loading ? 'Criando conta...' : 'Registrar'}
        </Button>

        <button type="button" className="register__back" onClick={() => navigate('/')}>
          ← Voltar para login
        </button>
      </form>
    </AuthLayout>
  );
};
