const deleteElementFromArray = (arr, elem) => {
  const idx = arr.indexOf(elem);
  if (idx < 0) {
    return arr;
  }
  return [...arr.slice(0, idx), ...arr.slice(idx + 1, arr.length)];
};