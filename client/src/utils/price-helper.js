const priceHelper = (nominal) => {
  if (nominal > 999) {
    const modulus = nominal % 1000;
    let val = '000';
    if (modulus > 0) val = `00${modulus}`;
    if (modulus > 10) val = `0${modulus}`;
    if (modulus > 100) val = modulus;
    return `${priceHelper(parseInt(nominal / 1000))}.${val}`;
  }
  return nominal;
};

export default priceHelper;
