import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 20px 20px 20px 20px;
  background-color: #005f98;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-content: center;

  button {
    position: absolute;
    background: none;
    border: none;
    color: #ed657d;
    font-size: 17px;
    font-weight: bold;

    &:hover {
      color: #e34360;
    }
  }

  div {
    display: flex;
    flex-direction: column;

    span {
      color: #fff;
      font-weight: bold;
      font-size: 17px;
      margin-bottom: 5px;
    }

    span.caixa {
      color: #38e372;
    }

    span.saidas {
      color: #ed657d;
    }

    span.resumo {
      color: #e3db59;
    }
    span.icon-perfil {
      margin-left: 8px;
      margin-bottom: 3px;
    }
  }

  div.perfil {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  div.caixa {
    margin-top: 30px;
  }

  div.left {
    display: flex;
    align-items: flex-end;
  }
`;
