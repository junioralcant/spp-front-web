export default function inputNumber(value: string) {
  let valor = value;
  valor = valor.replace(/\D/g, '');
  return valor;
}
