import { useAuth } from './context/AuthContext';
import { useState } from 'react';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login">
      <h2>SenaiBank Login</h2>
      <input placeholder="admin@email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="1234" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => login(email, password)}>Entrar</button>
    </div>
  );
}

export default Login
