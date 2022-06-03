import React, { useState, useEffect } from 'react';

import { AiOutlineUser } from 'react-icons/ai';

import { Container, Button, Content, Column, Girl } from './styles';

import { getUser } from '../../services/auth';

import { logout } from '../../services/auth';

import api from '../../services/api';

const HeaderHome = ({ history }) => {
  const [totals, setTotals] = useState([]);
  const [saidas, setSaidas] = useState([]);

  let userLogged = getUser();

  useEffect(() => {
    async function loadSaidas() {
      const response = await api.get('/todasdespesas');

      setSaidas(response.data);
    }

    loadSaidas();
  }, []);

  useEffect(() => {
    async function loadTotal() {
      const response = await api.get('/saldo');

      setTotals(response.data);
    }

    loadTotal();
  }, []);

  let totalSaidas = 0;
  let total = 0;

  saidas.filter((item) => {
    if (item.total) {
      totalSaidas += item.total;
    }
  });

  totals.filter((item) => {
    if (item.total) {
      total += item.total;
    }
  });

  let resumo = total - totalSaidas;

  function goOut() {
    logout();
    window.history.go(0);
  }
  return (
    <Container>
      <Content>
        <button onClick={() => goOut()}>Sair</button>
        <div className="caixa">
          <span>Caixa</span>
          <span className="caixa">
            {' '}
            {String(
              total?.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })
            )}
          </span>
        </div>
        <div>
          <div className="left perfil">
            <span>{userLogged.name}</span>
            <span className="icon-perfil">
              <AiOutlineUser />
            </span>
          </div>
          <div className="left">
            <span>Saídas</span>
            <span className="saidas">
              {' '}
              {String(
                totalSaidas.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
              )}
            </span>
          </div>
          <div className="left">
            <span>Saldo</span>
            <span className="resumo">
              {' '}
              {String(
                resumo.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
              )}
            </span>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default HeaderHome;
