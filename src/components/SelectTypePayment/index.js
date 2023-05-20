import React from 'react';
import {Select} from './styles';

export function SelectTypePayment({selectValue, value}) {
  function handleSelectTypePayment(value) {
    selectValue(value);
  }

  return (
    <Select className="box-input">
      <label>Selecione</label>
      <select
        onChange={(e) => handleSelectTypePayment(e.target.value)}
        value={value}
      >
        <option value="">Selecione o tipo de pagamento</option>
        <option value="A vista">A vista</option>
        <option value="A Prazo">A Prazo</option>
        <option value="Cartao de credito">Cartão de credito</option>
      </select>
    </Select>
  );
}
