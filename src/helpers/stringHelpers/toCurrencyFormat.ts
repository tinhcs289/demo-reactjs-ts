const toCurrencyFormat = (value?: number, currency: 'USD' | 'EUR' | 'VND' | 'JPY' = 'VND'): string => {
  if (!value || Number.isNaN(value)) return '';

  switch (currency) {
    case 'USD':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency })
        .format(value)
        .replace(/(\.)00/g, '');
    case 'EUR':
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency })
        .format(value)
        .replace(/(\.)00/g, '');
    case 'VND':
      let result = new Intl.NumberFormat('vn-VI', { style: 'currency', currency }).format(value);
      if (!!result && `${result}`.trim()[0] === '₫') {
        result = `${`${result}`.trim().substring(1)} ₫`;
      } else if (!!result && `${result}`.trim()[1] === '₫')
        result = `${`${result}`.trim().replace('₫', '')} ₫`;
      return result;
    case 'JPY':
      return new Intl.NumberFormat('ja-JP', { style: 'currency', currency })
        .format(value)
        .replace(/(\.)00/g, '');
    default:
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
};
export default toCurrencyFormat;
