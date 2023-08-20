import React, {useEffect} from 'react';

import {useLocation} from 'react-router-dom';

import {Container, Content, Table} from './styles';

import logo from '../../assets/LOGO.png';
import moment from 'moment';

const Print = () => {
  const location = useLocation();

  const {todasDespesas, totalSaidas, totalSaldo, resumo} =
    location.state;

  useEffect(() => {
    setTimeout(() => window.print(), 800);
  }, []);

  return (
    <Container>
      <Content>
        <div className="header">
          <img src={logo} alt="Logo" />
          <div className="data">
            <span>Registros: {todasDespesas.length}</span>
            <span>
              Caixa:{' '}
              {String(
                totalSaldo.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
              )}
            </span>
            <span>
              Saidas:{' '}
              {String(
                totalSaidas.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
              )}
            </span>
            <span>
              Saldo:{' '}
              {String(
                resumo.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
              )}
            </span>
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Linha</th>
              <th>Gasto com</th>
              <th>Valor</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {todasDespesas.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                <td>{item.nomeLinha}</td>
                <td>{item.title}</td>
                <td>
                  {item.total &&
                    String(
                      item.total.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    )}
                </td>
                <td>{item.descricao}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default Print;
