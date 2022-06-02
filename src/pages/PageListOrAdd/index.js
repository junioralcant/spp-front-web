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
              Cadastar
            </button>
          )}

          <button onClick={() => history.push(`${page}-list`)}>
            Listar
          </button>
        </Content>
      </Container>
    </>
  );
};

export default PageListOrAdd;
