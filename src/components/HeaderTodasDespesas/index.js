import React, { useState, useEffect } from 'react';

import { Container, Content } from './styles';

const HeaderTodasDespesas = ({
  namePage,
  totalSaidas,
  totalSaldo,
  resumo,
  registro,
}) => {
  return (
    <Container>
      <Content>
        <div className="caixa">
          <div>
            <span>Caixa</span>
            <span className="caixa">
              {' '}
              {String(
                totalSaldo.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
              )}
            </span>
          </div>

          <div>
            <span>Registros</span>
            <span>{registro}</span>
          </div>
        </div>

        <div>
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

export default HeaderTodasDespesas;
