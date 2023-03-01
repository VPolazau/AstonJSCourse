Array.prototype.filterArray = function (cb, thisArg) {
  let newMas = [];
  for (let i = 0; i < this.length; i++) {
    if (cb.call(thisArg, this[i], i, this)) {
      newMas.push(this[i]);
    }
  }
  return newMas;
};