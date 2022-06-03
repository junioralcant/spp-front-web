import React, { useState } from 'react';

import api from '../../services/api';
import { login, user } from '../../services/auth';
import Load from '../../components/Loader';

import { Container, Login } from './styles';

const SignIn = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar!');
    } else {
      try {
        setLoading(true);
        const response = await api.post('/sessions', {
          email,
          password,
        });

        user(response.data.user);
        login(response.data.token);
        history.push('/');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(
          'Houve um problema com o login, verifique suas credenciais. T.T'
        );
      }
    }
  }

  return (
    <Container>
      <Login>
        <h2>Spp Construtora</h2>
        {error && <p>{error}</p>}
        <div>
          <input
            type="email"
            placeholder="Informe um e-mail válido"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Informe a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? (
            <Load />
          ) : (
            <button onClick={handleSignIn}>Entrar</button>
          )}
        </div>
      </Login>
    </Container>
  );
};

export default SignIn;
