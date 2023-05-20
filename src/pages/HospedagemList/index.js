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

const HospedagemList = ({history}) => {
  const [search, setSearch] = useState(false);
  const [despesasExtras, setDespesasExtras] = useState([]);

  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [nomeHotel, setNomeHotel] = useState('');

  useEffect(() => {
    async function loadhospedagem() {
      const response = await api.get(
        `/hospedagem?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&nomeHotel=${nomeHotel}`
      );
      setDespesasExtras(response.data);
    }

    loadhospedagem();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, nomeHotel]);

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
    setNomeHotel('');
    setSearch(false);
  }

  async function deleteRegister(id) {
    if (window.confirm(`Deseja realmente deletar esse registro?`))
      try {
        await api.delete(`/hospedagem/${id}`);
        const response = await api.get('/hospedagem');
        setDespesasExtras(response.data);
        alert('Registro deletado com sucesso!');
      } catch (error) {
        console.log(error);
        alert('Problema ao deletar registro');
      }
  }

  function editRegister(id) {
    history.push('/hospedagem', {
      registerId: id,
    });
  }

  let total = 0;

  despesasExtras.filter((item) => {
    if (item.total) {
      total += item.total;
    }
  });

  return (
    <>
      <HeaderList
        pageName="Listagem Hospedagem"
        total={total}
        register={despesasExtras.length}
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
              placeholder="Buscas nome do hotel"
              value={nomeHotel}
              onChange={(e) => setNomeHotel(e.target.value)}
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
            {despesasExtras.map((hospedagem) => (
              <div key={hospedagem._id} className="card">
                <div className="header-card">
                  <button
                    onClick={() => deleteRegister(hospedagem._id)}
                    className="button-header-edit"
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    onClick={() => editRegister(hospedagem._id)}
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
                        {moment(hospedagem.createdAt).format(
                          'DD-MM-YYYY'
                        )}
                      </p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Linha: </p>
                      <p> {hospedagem.nomeLinha}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Hotel: </p>
                      <p>{hospedagem.nomeHotel}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Diárias: </p>
                      <p>{hospedagem.diarias}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Valor Unitário: </p>
                      <p>
                        {hospedagem.valorUnitario &&
                          hospedagem.valorUnitario.toLocaleString(
                            'pt-br',
                            {
                              style: 'currency',
                              currency: 'BRL',
                            }
                          )}
                      </p>
                    </div>
                    <div className="box-data">
                      <p className="foco">Pagamento: </p>
                      <p>{hospedagem.tipoPagamento}</p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Total: </p>
                      <p>
                        {' '}
                        {hospedagem.total &&
                          hospedagem.total.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                      </p>
                    </div>
                  </div>
                  <a href={hospedagem.imagem.url} target="_blank">
                    <img
                      className="image-content"
                      src={hospedagem.imagem.url}
                    />
                  </a>
                </BoxCardContent>

                <BoxDescriptionContent>
                  <span>Descrição</span>
                  <span className="text-description">
                    {hospedagem.descricao}
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

export default HospedagemList;
