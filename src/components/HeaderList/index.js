import React from 'react';

import {
  BoxTotal,
  BoxTotalGegister,
  Container,
  ContentHeader,
} from './styles';

const HeaderList = ({ history, pageName, total, register }) => {
  return (
    <Container>
      <ContentHeader>
        <BoxTotal>
          <span className="total-text">Total gasto</span>
          <span className="total">
            {total.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
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
