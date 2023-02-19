const deepCopyObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((val) => deepCopyObject(val));
  }
  if (typeof obj === 'object' && obj) {
    let clone = {};
    for (let key in obj) {
      clone[key] = deepCopyObject(obj[key]);
    }
    return clone;
  }
  return obj;
};