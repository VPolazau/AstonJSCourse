const getUniqArray = (arr) => {
  arr.forEach((el) => {
    if (typeof el !== 'number' || Number.isNaN(el)) {
      throw Error('В getUniqArray был передан невалидный параметр. Аргумент arr должен быть массивом чисел');
    }
  });

  return arr.filter((el, idx) => arr.indexOf(el) === idx);
};