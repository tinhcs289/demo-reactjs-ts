import numeral from 'numeral';
import type { NumeralJSLocale } from 'numeral';

//TODO: `en-us` locale wasn't included in `numeraljs`, follow this pull-request `https://github.com/adamwdraper/Numeral-js/pull/513`
// for now, use this file to add `en-us`

const us = {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: function (number) {
    var b = number % 10;
    return ~~((number % 100) / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
  },
  currency: {
    symbol: '$',
  },
} as NumeralJSLocale;

numeral.register('locale', 'en-US', us);

export default us;
