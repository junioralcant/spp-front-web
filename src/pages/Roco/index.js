import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Compressor from 'compressorjs';

import HeaderName from '../../components/HeaderName';
import api from '../../services/api';

import { Container, Content, Erro } from './styles';

import Loader from '../../components/Loader';

const Roco = ({ history }) => {
  const location = useLocation();

  const [registerId, setRegisterId] = useState('');
  const [loading, setLoading] = useState(false);

  const [nomeLinha, setNomeLinha] = useState('');
  const [descricao, setDescricao] = useState('');

  const [previewAntes, setPreviewAntes] = useState('');
  const [uriAntes, setUriAntes] = useState('');

  const [previewDepois, setPreviewDepois] = useState('');
  const [uriDepois, setUriDepois] = useState('');

  const [fotoAntes, setFotoAntes] = useState(false);
  const [fotoDepois, setFotoDepois] = useState(false);

  const [error, setError] = useState('');

  const [pickerResponseAntes, setPickerResponseAntes] = useState();
  const [pickerResponseDepois, setPickerResponseDepois] = useState();

  const fileSelectRef = useRef(null);

  function selectFile() {
    fileSelectRef.current.click();
  }

  async function register() {
    try {
      setError('');

      setLoading(true);
      const data = new FormData();

      pickerResponseAntes &&
        data.append('fotoAntes', pickerResponseAntes);

      pickerResponseDepois &&
        data.append('fotoDepois', pickerResponseDepois);

      data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);

      await api.post('/roco', data);
      setLoading(false);

      alert('Registro cadastrado');
      setNomeLinha('');
      setDescricao('');
      setPickerResponseAntes(null);
      setPreviewAntes('');
      setPickerResponseDepois(null);
      setPreviewDepois('');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get(`/roco/${registerId}`);

      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);

      response.data.fotoAntes &&
        setUriAntes(response.data.fotoAntes.url);
      response.data.fotoDepois &&
        setUriDepois(response.data.fotoDepois.url);
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

      pickerResponseAntes &&
        data.append('fotoAntes', pickerResponseAntes);

      pickerResponseDepois &&
        data.append('fotoDepois', pickerResponseDepois);

      nomeLinha && data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);

      await api.put(`/roco/${registerId}`, data);
      alert('Registro alterado!');
      history.push('/roco-list');
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
        pageName={!registerId ? 'Cadastrar Roço' : 'Alterar Roço'}
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
            <label>Descrição</label>
            <input
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="box-input">
            <div className="box-input-file">
              <input
                placeholder="Valor"
                type="file"
                className="custom-file-input"
                ref={fileSelectRef}
                onChange={(e) => {
                  if (fotoAntes === true && fotoDepois === false) {
                    // Diminui a qualidade da imagem
                    new Compressor(e.target.files[0], {
                      quality: 0.6,
                      success: (compressedResult) => {
                        setPickerResponseAntes(compressedResult);
                      },
                    });
                    setPreviewAntes(
                      URL.createObjectURL(e.target.files[0])
                    );
                    setUriAntes('');
                  }

                  if (fotoAntes === false && fotoDepois === true) {
                    // Diminui a qualidade da imagem
                    new Compressor(e.target.files[0], {
                      quality: 0.6,
                      success: (compressedResult) => {
                        setPickerResponseDepois(compressedResult);
                      },
                    });
                    setPreviewDepois(
                      URL.createObjectURL(e.target.files[0])
                    );
                    setUriDepois('');
                  }
                }}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <button
                className="fileSelect"
                onClick={() => {
                  selectFile();
                  setFotoAntes(true);
                  setFotoDepois(false);
                }}
              >
                Selecione imagem de antes
              </button>
              {previewAntes && <img src={previewAntes} />}
              {uriAntes && <img src={uriAntes} />}

              <button
                className="fileSelect"
                onClick={() => {
                  selectFile();
                  setFotoAntes(false);
                  setFotoDepois(true);
                }}
              >
                Selecione imagem de depois
              </button>
              {previewDepois && <img src={previewDepois} />}
              {uriDepois && <img src={uriDepois} />}
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

export default Roco;
