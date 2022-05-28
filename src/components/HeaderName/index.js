import React, { useState, useEffect } from 'react';

import { Container, Button, Content, Column, Girl } from './styles';

const HeaderName = ({ history, pageName }) => {
  return (
    <Container>
      <p>{pageName}</p>
    </Container>
  );
};

export default HeaderName;
