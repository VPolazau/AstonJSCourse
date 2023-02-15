const getNumberRadix = (number, radix) => {
  if (!+number || number < 0 || number % 1 !== 0 || !+radix || radix < 2 || radix > 16) {
    throw Error('Функция getNumberRadix была вызвана с некорректными параметрами.');
  }
  return (+number).toString(radix);
};