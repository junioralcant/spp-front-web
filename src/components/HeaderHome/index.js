import React, {useState, useEffect} from 'react';

import {AiOutlineUser} from 'react-icons/ai';

import {Container, Button, Content, Column, Girl} from './styles';

import {getUser} from '../../services/auth';

import {logout} from '../../services/auth';

import api from '../../services/api';

const HeaderHome = ({history}) => {
  const [totals, setTotals] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [dateFilter, setDateFilter] = useState('2023');

  let userLogged = getUser();

  useEffect(() => {
    async function loadSaidas() {
      const response = await api.get(
        `/todasdespesas?dataIncio=${dateFilter}-01-01&dataFim=${dateFilter}-12-31`
      );

      setSaidas(response.data);
    }

    loadSaidas();
  }, [dateFilter]);

  useEffect(() => {
    async function loadTotal() {
      const response = await api.get(
        `/saldo?dataIncio=${dateFilter}-01-01&dataFim=${dateFilter}-12-31`
      );

      setTotals(response.data);
    }

    loadTotal();
  }, [dateFilter]);

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

  console.log(dateFilter);
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
          <select
            onChange={(e) => setDateFilter(e.target.value)}
            value={dateFilter}
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
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
