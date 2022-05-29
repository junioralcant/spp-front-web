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
  }

  div.box-input-file {
    width: 100%;

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

    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
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
