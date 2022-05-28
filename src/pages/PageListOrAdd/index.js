import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderName from '../../components/HeaderName';

import { Container, Content, Login } from './styles';

const PageListOrAdd = ({ history }) => {
  const location = useLocation();
  const { page, pageName } = location.state;

  return (
    <>
      <HeaderName pageName={pageName} />
      <Container>
        <Content>
          {pageName !== 'Todas Despesas' && (
            <button onClick={() => history.push(page)}>
              {pageName === 'Alterar Saldo' ? 'Alterar' : 'Cadastar'}
            </button>
          )}

          {pageName !== 'Alterar Saldo' && (
            <button onClick={() => history.push(`${page}-list`)}>
              Listar
            </button>
          )}
        </Content>
      </Container>
    </>
  );
};

export default PageListOrAdd;
