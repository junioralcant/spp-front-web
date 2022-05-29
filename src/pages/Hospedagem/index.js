import React, { useState, useRef, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Compressor from 'compressorjs';

import HeaderName from '../../components/HeaderName';
import api from '../../services/api';

import { Container, Content, Erro } from './styles';

import inputValueMask from '../../components/inputValueMask';

import Loader from '../../components/Loader';
import inputNumber from '../../components/inputNumber/index';

const Hospedagem = ({ history }) => {
  const location = useLocation();

  const [registerId, setRegisterId] = useState('');
  const [loading, setLoading] = useState(false);

  const [hotel, setHotel] = useState('');
  const [nomeLinha, setNomeLinha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [diarias, setDiarias] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');

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

        data.append('diarias', diarias);
        data.append('nomeHotel', hotel);
        data.append('nomeLinha', nomeLinha);
        data.append('descricao', descricao);
        data.append(
          'valorUnitario',
          valorUnitario
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.')
        );
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.')
        );

        await api.post('/hospedagem', data);
        setLoading(false);

        alert('Registro cadastrado');
        setHotel('');
        setDiarias('');
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
      const response = await api.get(`/hospedagem/${registerId}`);

      setHotel(response.data.hotel);
      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);
      setDiarias(String(response.data.diarias));

      setValorUnitario(
        inputValueMask(String(response.data.valorUnitario) + '00')
      );
      if (String(response.data.valorUnitario).split('.')[1]) {
        if (
          String(response.data.valorUnitario).split('.')[1].length ===
          2
        ) {
          setValorUnitario(
            inputValueMask(String(response.data.valorUnitario))
          );
        }
        if (
          String(response.data.valorUnitario).split('.')[1].length ===
          1
        ) {
          setValorUnitario(
            inputValueMask(String(response.data.valorUnitario) + '0')
          );
        }
      }

      setValor(inputValueMask(String(response.data.total) + '00'));
      if (String(response.data.total).split('.')[1]) {
        if (String(response.data.total).split('.')[1].length === 2) {
          setValor(inputValueMask(String(response.data.total)));
        }
        if (String(response.data.total).split('.')[1].length === 1) {
          setValor(inputValueMask(String(response.data.total) + '0'));
        }
      }

      setUri(response.data.imagem.url);
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

      if (diarias && diarias !== 'undefined' && diarias !== 'null') {
        data.append('diarias', diarias);
      }
      valorUnitario &&
        data.append(
          'valorUnitario',
          valorUnitario
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.')
        );
      hotel && data.append('nomeHotel', hotel);
      nomeLinha && data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);
      valor &&
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.')
        );

      await api.put(`/hospedagem/${registerId}`, data);
      setLoading(false);
      alert('Registro alterado!');
      history.push('/hospedagem-list');
      window.history.go(0);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <HeaderName
        pageName={
          !registerId ? 'Cadastrar Hospedagem' : 'Alterar Hospedagem'
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
            <label>Nome Hotel</label>
            <input
              placeholder="Nome Hotel"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
            />
          </div>

          <div className="box-input">
            <label>Diárias</label>
            <input
              placeholder="Diárias"
              value={diarias}
              onChange={(e) =>
                setDiarias(inputNumber(e.target.value))
              }
            />
          </div>

          <div className="box-input">
            <label>Valor unitário </label>
            <input
              placeholder="Valor unitário"
              value={valorUnitario}
              onChange={(e) =>
                setValorUnitario(inputValueMask(e.target.value))
              }
            />
          </div>

          <div className="box-input">
            <label>Total</label>
            <input
              placeholder="Total"
              value={valor}
              onChange={(e) =>
                setValor(inputValueMask(e.target.value))
              }
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

export default Hospedagem;
