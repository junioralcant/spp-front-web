import React, { useState, useRef, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Compressor from 'compressorjs';

import HeaderName from '../../components/HeaderName';
import api from '../../services/api';

import { Container, Content, Erro } from './styles';

import inputValueMask from '../../components/inputValueMask';

import Loader from '../../components/Loader';

const Adiantamento = ({ history }) => {
  const location = useLocation();

  const [registerId, setRegisterId] = useState('');
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState('');
  const [nomeLinha, setNomeLinha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const [preview, setPreview] = useState('');
  const [uri, setUri] = useState('');

  const [error, setError] = useState('');

  const [pickerResponse, setPickerResponse] = useState();

  const fileSelectRef = useRef(null);

  function selectFile() {
    fileSelectRef.current.click();
  }

  async function register() {
    if (!pickerResponse) {
      setError('Selecione uma foto para continuar');
    } else {
      try {
        setError('');

        setLoading(true);
        const data = new FormData();

        data.append('file', pickerResponse);

        data.append('nomeColaborador', nome);
        data.append('nomeLinha', nomeLinha);
        data.append('descricao', descricao);
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.')
        );

        await api.post('/adiantamento', data);
        setLoading(false);

        alert('Registro cadastrado');
        setNome('');
        setNomeLinha('');
        setDescricao('');
        setValor('');
        setPickerResponse(null);
        setPreview('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get(`/adiantamento/${registerId}`);

      // setRegisterRecovered(response.data);
      setNome(response.data.nomeColaborador);
      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);

      setValor(inputValueMask(String(response.data.total) + '00'));
      if (String(response.data.total).split('.')[1]) {
        if (String(response.data.total).split('.')[1].length === 2) {
          setValor(inputValueMask(String(response.data.total)));
        }
        if (String(response.data.total).split('.')[1].length === 1) {
          setValor(inputValueMask(String(response.data.total) + '0'));
        }
      }

      response.data.imagem && setUri(response.data.imagem.url);
    }

    if (location.state) {
      const { registerId: id } = location.state;
      setRegisterId(id);
    }

    if (registerId) {
      loadRegister();
    }
  }, [registerId, location]);

  async function updateRegister() {
    try {
      setLoading(true);
      const data = new FormData();

      pickerResponse && data.append('file', pickerResponse);
      nome && data.append('nomeColaborador', nome);
      nomeLinha && data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);
      valor &&
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.')
        );

      await api.put(`/adiantamento/${registerId}`, data);
      alert('Registro alterado!');
      history.push('/adiantamento-list');
      window.history.go(0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <HeaderName
        pageName={
          !registerId
            ? 'Cadastrar Adiantamento'
            : 'Alterar Adiantamento'
        }
      />
      <Container>
        <Content>
          <div className="box-input">
            <label>Nome da linha</label>
            <input
              placeholder="Nome da linha"
              value={nomeLinha}
              onChange={(e) => setNomeLinha(e.target.value)}
            />
          </div>

          <div className="box-input">
            <label>Nome colaborador</label>
            <input
              placeholder="Nome colaborador"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="box-input">
            <label>Descri????o</label>
            <input
              placeholder="Descri????o"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="box-input">
            <label>Valor</label>
            <input
              placeholder="Valor"
              value={valor}
              onChange={(e) =>
                setValor(inputValueMask(e.target.value))
              }
            />
          </div>
          <div className="box-input">
            <button className="fileSelect" onClick={selectFile}>
              Selecione uma imagem
            </button>

            <div className="box-input-file">
              <input
                placeholder="Valor"
                type="file"
                className="custom-file-input"
                ref={fileSelectRef}
                onChange={(e) => {
                  // Diminui a qualidade da imagem
                  new Compressor(e.target.files[0], {
                    quality: 0.6,
                    success: (compressedResult) => {
                      setPickerResponse(compressedResult);
                    },
                  });
                  setPreview(URL.createObjectURL(e.target.files[0]));
                  setUri('');
                }}
                style={{ display: 'none' }}
                accept="image/*"
              />

              {preview && <img src={preview} />}
              {uri && <img src={uri} />}
            </div>
          </div>

          {!!error && <Erro>{error}</Erro>}

          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={() => {
                if (!registerId) {
                  register();
                } else {
                  updateRegister();
                }
              }}
            >
              {!registerId ? 'Cadastrar' : 'Salvar'}
            </button>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Adiantamento;
