import isNumber from '@/helpers/commonHelpers/isNumber';

/**
 * @example const numbers = consecutiveNumbers(0) // => numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @example const numbers = consecutiveNumbers(0, 5) // => numbers = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
 */
const consecutiveNumbers = (totalOfNumber: number, startValue: number = 0) => {
  if (isNumber(totalOfNumber, (n) => n > 0) && isNumber(startValue, (n) => n >= 0)) {
    return Object.keys([...Array(totalOfNumber)]).map((n) => parseInt(n) + startValue);
  } else return [];
};
export default consecutiveNumbers;
