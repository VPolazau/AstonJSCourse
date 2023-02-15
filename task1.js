const sum = (a, b) => {
  if (!+a) {
    return `${a} --> is not a number`;
  }
  if (!+b) {
    return `${b} --> is not a number`;
  }
  const value = +a + +b;
  return +value.toFixed(3);
};