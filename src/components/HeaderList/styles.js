import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 20px 20px 20px 20px;
  background-color: #005f98;
  height: 100px;

  p {
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
  }

  button.goback {
    position: absolute;
    background: none;
    border: none;
    color: #fff;
    font-size: 25px;
    left: 16px;
    top: 8px;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 900px;
`;

export const BoxTotal = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  span.total-text {
    font-size: 15px;
    color: #fff;
  }

  span.total {
    font-weight: bold;
    font-size: 17px;
    color: #e3db59;
  }
`;

export const BoxTotalGegister = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 10px;

  span.total-text {
    font-size: 15px;
    color: #fff;
  }

  span.total {
    font-weight: bold;
    font-size: 17px;
    color: #fff;
  }
`;
