import React from 'react';
import HeaderHome from '../../components/HeaderHome';

import {Container, Content} from './styles';

const Dashboard = ({history}) => {
  const DATA = [
    {
      title: 'Adiantamento/Pagamento',
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
      page: '/despesa-extra',
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
      title: 'Serviço',
      page: '/servico',
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
            <button
              key={data.title}
              onClick={() => navigation(data.page, data.title)}
            >
              {data.title}
            </button>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
