import React, {useEffect} from 'react';

import {useLocation} from 'react-router-dom';

import {Container, Content, Table} from './styles';

import logo from '../../assets/LOGO.png';
import moment from 'moment';

const PrintEntradas = () => {
  const location = useLocation();
  const {saldos, total} = location.state;

  useEffect(() => {
    setTimeout(() => window.print(), 800);
  }, []);

  return (
    <Container>
      <Content>
        <div className="header">
          <img src={logo} alt="Logo" />
          <div className="data">
            <span>
              Registros:
              {saldos.length}
            </span>

            <span>
              Total:{' '}
              {String(
                total.toLocaleString('pt-br', {
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
              <th>Para</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {saldos.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                <td>{item.userCreate.name}</td>
                <td>
                  {item.total &&
                    String(
                      item.total.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default PrintEntradas;
