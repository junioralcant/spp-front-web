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
`;
