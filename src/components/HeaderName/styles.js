import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #005f98;
  height: 100px;

  p {
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
    left: 20px;
  }
`;
