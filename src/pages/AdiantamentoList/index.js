import React, {useState} from 'react';
import {useEffect} from 'react';
import moment from 'moment';

import api from '../../services/api';

import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiFillEdit,
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

const Adiantamento = ({history}) => {
  const [search, setSearch] = useState(false);
  const [adiantamentos, setAdiantamentos] = useState([]);

  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [colaborador, setColaborador] = useState('');

  useEffect(() => {
    async function loadAdiantamento() {
      const response = await api.get(
        `/adiantamento?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&colaborador=${colaborador}`
      );
      setAdiantamentos(response.data);
    }

    loadAdiantamento();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, colaborador]);

  function checksDates() {
    if (dataIncio.length !== 10 || dataFim.length !== 10) {
      return;
    }

    setDataInicioChecks(dataIncio);
    setDataFimChecks(dataFim);

    setSearch(true);
  }

  function coloseSearch() {
    setDataFim('');
    setDataFimChecks('');
    setDataInicio('');
    setDataInicioChecks('');
    setNomeLinha('');
    setColaborador('');
    setSearch(false);
  }

  async function deleteRegister(id) {
    if (window.confirm(`Deseja realmente deletar esse registro?`))
      try {
        await api.delete(`/adiantamento/${id}`);
        const response = await api.get('/adiantamento');
        setAdiantamentos(response.data);
        alert('Registro deletado com sucesso!');
      } catch (error) {
        console.log(error);
        alert('Problema ao deletar registro');
      }
  }

  function editRegister(id) {
    history.push('/adiantamento', {
      registerId: id,
    });
  }

  let total = 0;

  adiantamentos.filter((item) => {
    if (item.total) {
      total += item.total;
    }
  });

  return (
    <>
      <HeaderList
        pageName="Listagem Adiantamento/Pagamento"
        total={total}
        register={adiantamentos.length}
      />
      <Container>
        <Content>
          <div className="box-input">
            <input
              placeholder="Buscas nome da linha"
              value={nomeLinha}
              onChange={(e) => setNomeLinha(e.target.value)}
            />
          </div>
          <div className="box-input">
            <input
              placeholder="Buscas por nome da colaborador"
              value={colaborador}
              onChange={(e) => setColaborador(e.target.value)}
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
            {adiantamentos.map((adiantamento) => (
              <div key={adiantamento._id} className="card">
                <div className="header-card">
                  <button
                    onClick={() => deleteRegister(adiantamento._id)}
                    className="button-header-edit"
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    onClick={() => editRegister(adiantamento._id)}
                    className="button-header-delete"
                  >
                    <AiFillEdit />
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
                      <p className="foco"> Linha: </p>
                      <p> {adiantamento.nomeLinha}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Colaborador: </p>
                      <p>{adiantamento.nomeColaborador}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco">Pagamento: </p>
                      <p>{adiantamento.tipoPagamento}</p>
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
                  {adiantamento.imagem && (
                    <a href={adiantamento.imagem.url} target="_blank">
                      <img
                        className="image-content"
                        src={adiantamento.imagem.url}
                      />
                    </a>
                  )}
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

export default Adiantamento;
