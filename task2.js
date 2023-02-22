const addElementsToArray = (arr, index = arr.length) => {
  if (index < 0 || !Number.isInteger(index)) {
    throw new Error(' the index cannot be a negative number or a fractional number ');
  }
  return (...args) => [...arr.slice(0, index), ...args, ...arr.slice(index, arr.length)];
};