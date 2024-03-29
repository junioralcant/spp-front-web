import React, {useState} from 'react';
import {useEffect} from 'react';
import moment from 'moment';

import api from '../../services/api';

import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiFillPrinter,
} from 'react-icons/ai';

import {
  BoxCardContent,
  BoxDescriptionContent,
  BoxInpuDate,
  BoxInputsDate,
  BoxList,
  Container,
  Content,
} from './styles';

import HeaderList from '../../components/HeaderList';

const AlterarSaldoList = ({history}) => {
  const [search, setSearch] = useState(false);
  const [saldos, setSaldos] = useState([]);

  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');

  useEffect(() => {
    async function loadSaldos() {
      const response = await api.get(
        `/saldo?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&descricao=${descricao}&name=${nome}`
      );
      setSaldos(response.data);
    }

    loadSaldos();
  }, [dataFimChecks, dataInicioChecks, descricao, nome]);

  function checksDates() {
    if (dataIncio.length !== 10 || dataFim.length !== 10) {
      return;
    }

    setDataInicioChecks(dataIncio);
    setDataFimChecks(dataFim);

    setSearch(true);
  }

  console.log(saldos);

  function coloseSearch() {
    setDataFim('');
    setDataFimChecks('');
    setDataInicio('');
    setDataInicioChecks('');
    setDescricao('');
    setSearch(false);
  }

  async function deleteRegister(id) {
    if (window.confirm(`Deseja realmente deletar esse registro?`))
      try {
        await api.delete(`/saldo/${id}`);
        const response = await api.get('/saldo');
        setSaldos(response.data);
        alert('Registro deletado com sucesso!');
        history.push('/');
        window.history.go(0);
      } catch (error) {
        console.log(error);
        alert('Problema ao deletar registro');
      }
  }

  let total = 0;

  saldos.filter((item) => {
    if (item.total) {
      total += item.total;
    }
  });

  function print() {
    history.push('/print-entradas', {
      saldos,
      total,
    });
  }

  return (
    <>
      <HeaderList
        pageName="Listagem Saldos"
        total={total}
        register={saldos.length}
      />
      <Container>
        <Content>
          <div className="box-input">
            <input
              placeholder="Buscar por descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <input
              placeholder="Buscar por nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <BoxInputsDate>
            <BoxInpuDate>
              <input
                className="date"
                onChange={(e) => setDataInicio(e.target.value)}
                value={dataIncio}
                type="date"
              />
            </BoxInpuDate>

            <BoxInpuDate>
              <input
                className="date"
                onChange={(e) => setDataFim(e.target.value)}
                value={dataFim}
                type="date"
              />
            </BoxInpuDate>

            <button
              className="search"
              onClick={() => {
                checksDates();
              }}
            >
              <AiOutlineSearch />
            </button>

            <button
              className="search"
              onClick={() => {
                print();
              }}
              style={{marginLeft: 5}}
            >
              <AiFillPrinter />
            </button>

            {search && (
              <button
                className="excluir"
                onClick={() => {
                  coloseSearch();
                }}
              >
                <AiOutlineCloseCircle />
              </button>
            )}
          </BoxInputsDate>

          <BoxList>
            {saldos.map((adiantamento) => (
              <div key={adiantamento._id} className="card">
                <div className="header-card">
                  <button
                    onClick={() => deleteRegister(adiantamento._id)}
                    className="button-header-edit"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>

                <BoxCardContent>
                  <div className="box-data-content">
                    <div className="box-data">
                      <p className="foco"> Data: </p>
                      <p>
                        {moment(adiantamento.createdAt).format(
                          'DD-MM-YYYY'
                        )}
                      </p>
                    </div>

                    <div className="box-data">
                      <p className="foco"> Para: </p>
                      <p>
                        {adiantamento.userCreate &&
                          adiantamento.userCreate.name}
                      </p>
                    </div>

                    <div className="box-data">
                      <p className="foco"> Total: </p>
                      <p>
                        {' '}
                        {adiantamento.total &&
                          adiantamento.total.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                      </p>
                    </div>
                  </div>
                </BoxCardContent>

                <BoxDescriptionContent>
                  <span>Descrição</span>
                  <span className="text-description">
                    {adiantamento.descricao}
                  </span>
                </BoxDescriptionContent>
              </div>
            ))}
          </BoxList>
        </Content>
      </Container>
    </>
  );
};

export default AlterarSaldoList;
