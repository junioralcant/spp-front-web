import React from 'react';

import { AiOutlineArrowLeft } from 'react-icons/ai';

import { useHistory } from 'react-router-dom';

import { Container } from './styles';

const HeaderName = ({ pageName }) => {
  let history = useHistory();

  function goBack() {
    history.push('/');
  }
  return (
    <Container>
      <button onClick={goBack} className="goback">
        <AiOutlineArrowLeft />
      </button>
      <p>{pageName}</p>
    </Container>
  );
};

export default HeaderName;
