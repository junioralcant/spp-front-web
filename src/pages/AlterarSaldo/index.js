import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Compressor from 'compressorjs';

import HeaderName from '../../components/HeaderName';
import api from '../../services/api';

import { Container, Content, Erro } from './styles';

import inputValueMask from '../../components/inputValueMask';

import Loader from '../../components/Loader';

const AlterarSaldo = ({ history }) => {
  const [valor, setValor] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function register() {
    if (!valor) {
      setError('Informe um valor para continuar');
    } else {
      try {
        setLoading(true);

        await api.post('/saldo', {
          total: valor
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.'),
        });
        setLoading(false);

        alert('Saldo cadastrado');

        setValor('');
        history.push('/');
        window.history.go(0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <HeaderName pageName={'Alterar Saldo'} />
      <Container>
        <Content>
          <div className="box-input">
            <label>Total</label>
            <input
              placeholder="Total"
              value={valor}
              onChange={(e) =>
                setValor(inputValueMask(e.target.value))
              }
            />
          </div>

          {!!error && <Erro>{error}</Erro>}

          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={() => {
                register();
              }}
            >
              Cadastrar
            </button>
          )}
        </Content>
      </Container>
    </>
  );
};

export default AlterarSaldo;
