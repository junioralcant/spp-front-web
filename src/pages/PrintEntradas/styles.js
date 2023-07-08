import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 700px;
  padding: 0px 10px;

  div.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    div.data {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    span {
      font-weight: bold;
    }
  }

  img {
    width: 120px;
  }
`;

export const Table = styled.table`
  width: 100%;
  td,
  th {
    border: 1px solid #ddd;
    padding: 3px;
  }

  tr:nth-child(even) {
    background-color: #ddd;
  }

  tr:hover {
    background-color: #cecece;
  }
  th {
    padding-top: 3px;
    padding-bottom: 3px;
    text-align: left;
    background-color: #cecece;
    color: #000;
  }
`;
