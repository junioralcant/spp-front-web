import React, {useState} from 'react';
import {useEffect} from 'react';
import moment from 'moment';

import api from '../../services/api';

import {
  AiOutlineSearch,
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

import HeaderTodasDespesas from '../../components/HeaderTodasDespesas';
import {SelectTypePayment} from '../../components/SelectTypePayment';

const TodasDespesasList = ({history}) => {
  const [search, setSearch] = useState(false);
  const [todasDespesas, setTodasDespesas] = useState([]);
  const [totals, setTotals] = useState([]);

  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [allDatas, setAllDatas] = useState('');
  const [tipoDePagamento, setTipoDePagamento] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function loadDespesa() {
      const response = await api.get(
        `/todasdespesas?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&title=${title}&tipoPagamento=${tipoDePagamento}`
      );
      setTodasDespesas(response.data);
    }

    loadDespesa();
  }, [
    dataFimChecks,
    dataInicioChecks,
    nomeLinha,
    title,
    tipoDePagamento,
  ]);

  function checksDates() {
    if (dataIncio.length !== 10 || dataFim.length !== 10) {
      return;
    }

    setAllDatas('todas');
    setDataInicioChecks(dataIncio);
    setDataFimChecks(dataFim);

    setSearch(true);
  }

  useEffect(() => {
    async function loadTotal() {
      const response = await api.get(
        `/saldo?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&allDatas=${allDatas}`
      );

      setTotals(response.data);
    }

    loadTotal();
  }, [dataFimChecks, dataInicioChecks, allDatas]);

  function coloseSearch() {
    setDataFim('');
    setDataFimChecks('');
    setDataInicio('');
    setDataInicioChecks('');
    setNomeLinha('');
    setAllDatas('');
    setSearch(false);
  }

  let totalSaidas = 0;
  let totalSaldo = 0;

  todasDespesas.filter((item) => {
    if (item.total) {
      totalSaidas += item.total;
    }
  });

  totals.filter((item) => {
    if (item.total) {
      totalSaldo += item.total;
    }
  });

  let resumo = totalSaldo - totalSaidas;

  function print() {
    history.push('/print', {
      todasDespesas,
      totalSaidas,
      totalSaldo,
      resumo,
    });
  }

  return (
    <>
      <HeaderTodasDespesas
        namePage="Todas as Despesas"
        totalSaidas={totalSaidas}
        totalSaldo={totalSaldo}
        resumo={resumo}
        registro={todasDespesas.length}
      />
      <Container>
        <Content>
          <div className="box-input">
            <input
              placeholder="Buscar nome da linha"
              value={nomeLinha}
              onChange={(e) => setNomeLinha(e.target.value)}
            />
          </div>

          <div className="box-input">
            <input
              placeholder="Buscar por tipo de despesa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <SelectTypePayment
            selectValue={(value) => setTipoDePagamento(value)}
            value={tipoDePagamento}
            labelShow={false}
          />

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
            {todasDespesas.map((despesa) => (
              <div key={despesa._id} className="card">
                <BoxCardContent>
                  <div className="box-data-content">
                    <div className="box-data">
                      <p className="foco"> Data: </p>
                      <p>
                        {moment(despesa.createdAt).format(
                          'DD-MM-YYYY'
                        )}
                      </p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Linha: </p>
                      <p> {despesa.nomeLinha}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Gasto com: </p>
                      <p>{despesa.title}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco">Pagamento: </p>
                      <p>{despesa.tipoPagamento}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Total: </p>
                      <p>
                        {despesa.total &&
                          despesa.total.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                      </p>
                    </div>
                  </div>

                  {despesa.imagem && (
                    <a href={despesa.imagem.url} target="_blank">
                      <img
                        className="image-content"
                        src={despesa.imagem.url}
                      />
                    </a>
                  )}
                </BoxCardContent>

                <BoxDescriptionContent>
                  <span>Descrição</span>
                  <span className="text-description">
                    {despesa.descricao}
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

export default TodasDespesasList;
