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

const AbastecimentoList = ({history}) => {
  const [search, setSearch] = useState(false);
  const [abastecimentos, setAbastecimentos] = useState([]);

  const [dataIncio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [dataInicioChecks, setDataInicioChecks] = useState('');
  const [dataFimChecks, setDataFimChecks] = useState('');

  const [nomeLinha, setNomeLinha] = useState('');
  const [veiculo, setVeiculo] = useState('');

  useEffect(() => {
    async function loadabastecimento() {
      const response = await api.get(
        `/abastecimento?dataIncio=${dataInicioChecks}&dataFim=${dataFimChecks}&nomeLinha=${nomeLinha}&veiculo=${veiculo}`
      );
      setAbastecimentos(response.data);
    }

    loadabastecimento();
  }, [dataFimChecks, dataInicioChecks, nomeLinha, veiculo]);

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
    setVeiculo('');
    setSearch(false);
  }

  async function deleteRegister(id) {
    if (window.confirm(`Deseja realmente deletar esse registro?`))
      try {
        await api.delete(`/abastecimento/${id}`);
        const response = await api.get('/abastecimento');
        setAbastecimentos(response.data);
        alert('Registro deletado com sucesso!');
      } catch (error) {
        console.log(error);
        alert('Problema ao deletar registro');
      }
  }

  function editRegister(id) {
    history.push('/abastecimento', {
      registerId: id,
    });
  }

  let total = 0;

  abastecimentos.filter((item) => {
    if (item.total) {
      total += item.total;
    }
  });

  return (
    <>
      <HeaderList
        pageName="Listagem Abastecimento"
        total={total}
        register={abastecimentos.length}
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
              placeholder="Buscas por nome da veiculo"
              value={veiculo}
              onChange={(e) => setVeiculo(e.target.value)}
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
            {abastecimentos.map((abastecimento) => (
              <div key={abastecimento._id} className="card">
                <div className="header-card">
                  <button
                    onClick={() => deleteRegister(abastecimento._id)}
                    className="button-header-edit"
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    onClick={() => editRegister(abastecimento._id)}
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
                        {moment(abastecimento.createdAt).format(
                          'DD-MM-YYYY'
                        )}
                      </p>
                    </div>
                    <div className="box-data">
                      <p className="foco"> Linha: </p>
                      <p> {abastecimento.nomeLinha}</p>
                    </div>

                    <div className="box-data">
                      <p className="foco"> Veiculo: </p>
                      <p>{abastecimento.veiculo}</p>
                    </div>

                    <div className="box-data">
                      <p className="foco"> Litros: </p>
                      <p> {abastecimento.litros} L</p>
                    </div>

                    <div className="box-data">
                      <p className="foco"> Valor Unitário: </p>
                      <p>
                        {abastecimento.valorUnitario &&
                          abastecimento.valorUnitario.toLocaleString(
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
                      <p>{abastecimento.tipoPagamento}</p>
                    </div>

                    <div className="box-data">
                      <p className="foco"> Total: </p>
                      <p>
                        {' '}
                        {abastecimento.total &&
                          abastecimento.total.toLocaleString(
                            'pt-br',
                            {
                              style: 'currency',
                              currency: 'BRL',
                            }
                          )}
                      </p>
                    </div>
                  </div>
                  <a href={abastecimento.imagem.url} target="_blank">
                    <img
                      className="image-content"
                      src={abastecimento.imagem.url}
                    />
                  </a>
                </BoxCardContent>

                <BoxDescriptionContent>
                  <span>Descrição</span>
                  <span className="text-description">
                    {abastecimento.descricao}
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

export default AbastecimentoList;
