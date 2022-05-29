import React, { useState, useRef, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Compressor from 'compressorjs';

import HeaderName from '../../components/HeaderName';
import api from '../../services/api';

import { Container, Content, Erro } from './styles';

import inputValueMask from '../../components/inputValueMask';

import Loader from '../../components/Loader';
import inputNumber from '../../components/inputNumber/index';

const Pecas = ({ history }) => {
  const location = useLocation();

  const [registerId, setRegisterId] = useState('');
  const [loading, setLoading] = useState(false);

  const [nomePeca, setNomePeca] = useState('');
  const [nomeLinha, setNomeLinha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [desconto, setDesconto] = useState('');
  const [veiculo, setVeiculo] = useState('');

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

        data.append('quantidade', quantidade);
        data.append('nomePeca', nomePeca);
        data.append('veiculo', veiculo);
        data.append('nomeLinha', nomeLinha);
        data.append('descricao', descricao);
        data.append(
          'desconto',
          desconto
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.')
        );
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

        await api.post('/peca', data);
        setLoading(false);

        alert('Registro cadastrado');
        setNomePeca('');
        setQuantidade('');
        setNomeLinha('');
        setDescricao('');
        setValorUnitario('');
        setDesconto('');
        setValor('');
        setVeiculo('');
        setPickerResponse(null);
        setPreview('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function loadRegister() {
      const response = await api.get(`/peca/${registerId}`);

      setNomePeca(response.data.nomePeca);
      setVeiculo(response.data.veiculo);
      setNomeLinha(response.data.nomeLinha);
      setDescricao(response.data.descricao);
      setQuantidade(String(response.data.quantidade));

      setDesconto(
        inputValueMask(String(response.data.desconto) + '00')
      );
      if (String(response.data.desconto).split('.')[1]) {
        if (
          String(response.data.desconto).split('.')[1].length === 2
        ) {
          setDesconto(inputValueMask(String(response.data.desconto)));
        }
        if (
          String(response.data.desconto).split('.')[1].length === 1
        ) {
          setDesconto(
            inputValueMask(String(response.data.desconto) + '0')
          );
        }
      }

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

      if (
        quantidade &&
        quantidade !== 'undefined' &&
        quantidade !== 'null'
      ) {
        data.append('quantidade', quantidade);
      }
      desconto &&
        data.append(
          'desconto',
          desconto
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.')
        );
      valorUnitario &&
        data.append(
          'valorUnitario',
          valorUnitario
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.')
        );
      veiculo && data.append('veiculo', veiculo);
      nomePeca && data.append('nomePeca', nomePeca);
      nomeLinha && data.append('nomeLinha', nomeLinha);
      descricao && data.append('descricao', descricao);
      valor &&
        data.append(
          'total',
          valor.replace('R$ ', '').replace('.', '').replace(',', '.')
        );

      await api.put(`/peca/${registerId}`, data);
      setLoading(false);
      alert('Registro alterado!');
      history.push('/pecas-list');
      window.history.go(0);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <HeaderName
        pageName={!registerId ? 'Cadastrar Pecas' : 'Alterar Pecas'}
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
            <label>Nome Peça</label>
            <input
              placeholder="Nome Peça"
              value={nomePeca}
              onChange={(e) => setNomePeca(e.target.value)}
            />
          </div>

          <div className="box-input">
            <label>Veiculo</label>
            <input
              placeholder="Veiculo"
              value={veiculo}
              onChange={(e) => setVeiculo(e.target.value)}
            />
          </div>

          <div className="box-input">
            <label>Quantidade</label>
            <input
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) =>
                setQuantidade(inputNumber(e.target.value))
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
            <label>Desconto </label>
            <input
              placeholder="Desconto"
              value={desconto}
              onChange={(e) =>
                setDesconto(inputValueMask(e.target.value))
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

export default Pecas;
