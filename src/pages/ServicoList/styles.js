import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0px 20px 0px 20px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #005f98;
    width: 100%;
    height: 65px;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
    border: none;
    width: 100%;

    color: #fff;
    font-weight: bold;
    font-size: 20px;
  }

  button.search {
    background-color: #005f98;
    padding: 5px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-radius: 10px;
    height: 60px;
    width: 200px;
    font-size: 30px;
  }

  button.excluir {
    background-color: #ae3d0c;
    padding: 5px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-radius: 10px;
    height: 60px;
    width: 200px;
    font-size: 30px;
    margin-left: 10px;
  }

  div.box-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    label {
      margin-left: 5px;
      margin-bottom: 3px;
    }

    input {
      width: 100%;
      height: 60px;
      background-color: #fff;
      margin: 0 0 0px 0;
      border-radius: 10px;
      padding-left: 15px;
      border: 1px #c4c4c4;
      margin-bottom: 10px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #005f98;
      width: 90%;
      height: 65px;
      border-radius: 10px;
      margin-top: 10px;
      margin-bottom: 5px;
      border: none;
      color: #ffff;
      font-size: 18px;
      font-weight: bold;

      &:hover {
        background: #0c4b81;
      }
    }

    button.fileSelect {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      max-width: 250px;
      height: 60px;
      border-radius: 10px;
      margin-top: 10px;
      margin-bottom: 5px;
      border: none;
      color: #c4c4c4;
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

export const Erro = styled.span`
  align-self: center;
  text-align: center;
  color: #ff4d4d;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const BoxInputsDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  /* background: red; */
  /* width: 80%; */
`;

export const BoxInpuDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  /* padding: 20px 20px 0 20px; */

  input.date {
    height: 60px;
    background-color: #fff;
    margin: 0 15px 0px 0;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border: 1px #c4c4c4;
    width: 100%;
  }
`;

export const BoxList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 95px;

  div.card {
    width: 90%;
    background-color: #005f98;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
  }

  div.header-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  button.button-header-delete {
    background-color: #3d9df6;
    padding: 5px;
    border-radius: 5px;
    width: 50px;
    height: 50px;
    font-size: 30px;
  }

  button.button-header-edit {
    background-color: #ae3d0c;
    padding: 5px;
    border-radius: 5px;
    width: 50px;
    height: 50px;
    font-size: 30px;
  }
`;

export const BoxCardContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div.box-data-content {
    width: 60%;

    div.box-data {
      display: flex;
    }

    p {
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 7px;
    }

    p.foco {
      color: #c4c4c4 !important;
      margin-right: 5px;
    }
  }

  img.image-content {
    width: 90px;
    height: 90px;
    border-radius: 5px;
  }
`;

export const BoxDescriptionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 7px;
  }

  span.text-description {
    color: #fff;
    font-weight: 500;
    font-size: 18px;
  }
`;
