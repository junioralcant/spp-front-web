import React, { useState, useEffect } from 'react';
import HeaderHome from '../../components/HeaderHome';

import { Container, Content } from './styles';

const Dashboard = ({ history }) => {
  const DATA = [
    {
      title: 'Adiantamento',
      page: '/adiantamento',
    },
    {
      title: 'Alimentação',
      page: '/alimentacao',
    },
    {
      title: 'Abastecimento',
      page: '/abastecimento',
    },
    {
      title: 'Despesa Extra',
      page: '/despesaExtra',
    },
    {
      title: 'Hospedagem',
      page: '/hospedagem',
    },
    {
      title: 'Peças',
      page: '/pecas',
    },
    {
      title: 'Roço',
      page: '/roco',
    },
    {
      title: 'Todas Despesas',
      page: '/todas-despesas',
    },
    {
      title: 'Alterar Saldo',
      page: '/alterar-saldo',
    },
  ];

  function navigation(page, pageName) {
    // history.push({
    //   pathName: '/castrar-listar',
    //   state: { page: path, pageName: pageName },
    // });
    history.push('/castrar-listar', {
      page,
      pageName,
    });
  }

  return (
    <>
      <HeaderHome />
      <Container>
        <Content>
          {DATA.map((data) => (
            <button onClick={() => navigation(data.page, data.title)}>
              {data.title}
            </button>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
