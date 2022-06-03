import React from 'react';
import { useLocation } from 'react-router-dom';

import HeaderName from '../../components/HeaderName';

import { getUser } from '../../services/auth';

import { Container, Content } from './styles';

const PageListOrAdd = ({ history }) => {
  let userLogged = getUser();

  const location = useLocation();

  const { page, pageName } = location.state;

  return (
    <>
      <HeaderName pageName={pageName} />
      <Container>
        <Content>
          {pageName !== 'Todas Despesas' &&
            pageName !== 'Alterar Despesa' &&
            userLogged.role !== 'ROLE_ADMIN' && (
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
