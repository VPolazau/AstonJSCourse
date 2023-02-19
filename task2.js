const getInterval = (arr, from, to) => {
  if (typeof from !== 'number' || Number.isNaN(from)) {
    throw Error('В функцию getInterval были переданы невалидные параметры. Параметр from должен быть числом');
  }
  if (typeof to !== 'number' || Number.isNaN(to)) {
    throw Error('В функцию getInterval были переданы невалидные параметры. Параметр to должен быть числом');
  }

  arr.forEach((el) => {
    if (typeof el !== 'number' || Number.isNaN(el)) {
      throw Error(
        'В функцию getInterval были переданы невалидные параметры. Параметр arr должен содержать только числовые значения'
      );
    }
  });

  if (from < to) {
    return arr.filter((el) => el >= from && el <= to);
  }

  return arr.filter((el) => el <= from && el >= to);
};