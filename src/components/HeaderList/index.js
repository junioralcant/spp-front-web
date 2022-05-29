import React from 'react';

import { useHistory } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';

import {
  BoxTotal,
  BoxTotalGegister,
  Container,
  ContentHeader,
} from './styles';

const HeaderList = ({ pageName, total, register }) => {
  let history = useHistory();

  function goBack() {
    history.push('/');
  }
  return (
    <Container>
      <button onClick={goBack} className="goback">
        <AiOutlineArrowLeft />
      </button>
      <ContentHeader>
        <BoxTotal>
          {pageName !== 'Listagem Roço' && (
            <>
              <span className="total-text">Total gasto</span>
              <span className="total">
                {total.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </>
          )}
        </BoxTotal>

        <p>{pageName}</p>

        <BoxTotalGegister>
          <span className="total-text">Registros</span>
          <span className="total">{register}</span>
        </BoxTotalGegister>
      </ContentHeader>
    </Container>
  );
};

export default HeaderList;
