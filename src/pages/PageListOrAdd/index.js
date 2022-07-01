import React from 'react';
import { useLocation } from 'react-router-dom';

import HeaderName from '../../components/HeaderName';

import { getUser } from '../../services/auth';

import { Container, Content } from './styles';

const PageListOrAdd = ({ history }) => {
  let userLogged = getUser();

  const location = useLocation();

  const { page, pageName } = location.state;

  const DATA = [
    {
      title: 'TCAT',
      page: '/roco',
    },
    {
      title: 'TCVC',
      page: '/roco',
    },
    {
      title: 'TCMB',
      page: '/roco',
    },
    {
      title: 'TMRU',
      page: '/roco',
    },
    {
      title: 'ATTM',
      page: '/roco',
    },
  ];

  function navigation(page, pageName) {
    history.push('/castrar-listar', {
      page,
      pageName,
    });
  }

  return (
    <>
      <HeaderName pageName={pageName} />
      <Container>
        {pageName === 'Roço' ? (
          <Content>
            {DATA.map((item) => (
              <button
                onClick={() => navigation(item.page, item.title)}
              >
                {item.title}
              </button>
            ))}
          </Content>
        ) : (
          <Content>
            {pageName !== 'Todas Despesas' &&
              pageName !== 'Alterar Despesa' &&
              userLogged.role !== 'ROLE_ADMIN' && (
                <button
                  // parametro pageName é usado apenas no cadastro do Roço para saber o nome da linha
                  onClick={() => history.push(page, { pageName })}
                >
                  Cadastar
                </button>
              )}

            <button
              onClick={() =>
                // parametro pageName é usado apenas na listagem do Roço para saber o nome da linha
                history.push(`${page}-list`, { pageName })
              }
            >
              Listar
            </button>
          </Content>
        )}
      </Container>
    </>
  );
};

export default PageListOrAdd;
