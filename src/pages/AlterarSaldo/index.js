import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Compressor from 'compressorjs';

import HeaderName from '../../components/HeaderName';
import api from '../../services/api';

import { Container, Content, Erro } from './styles';

import inputValueMask from '../../components/inputValueMask';

import inputNumber from '../../components/inputNumber';

import Loader from '../../components/Loader';

const AlterarSaldo = ({ history }) => {
  const location = useLocation();
  const [valor, setValor] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get('/saldo');

      setValor(inputValueMask(String(response.data.total) + '00'));
      setId(response.data._id);
    }

    loadRegister();
  }, []);

  async function updateRegister() {
    try {
      setLoading(true);
      let totalFormatted = valor
        .replace('R$ ', '')
        .replace('.', '')
        .replace(',', '.');
      const response = await api.put(`/saldo/${id}`, {
        total: totalFormatted,
      });
      console.log(response.data);

      alert('Saldo alterado!');
      history.push('/');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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

          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={() => {
                updateRegister();
              }}
            >
              Salvar
            </button>
          )}
        </Content>
      </Container>
    </>
  );
};

export default AlterarSaldo;
