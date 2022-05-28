import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 320px;
  border-radius: 10px;
  background: #208eeb;
  padding: 20px;
  color: #fff;

  p {
    color: #f30800e5;
    margin-bottom: 15px;
    border: 1px solid #f30800e5;
    padding: 10px;
    width: 100%;
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

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
`;
