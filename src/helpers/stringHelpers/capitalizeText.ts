import capitalizeFirstLetter from './capitalizeFirstLetter';

const capitalizeText = (value: any): string => {
  if (typeof value !== 'string') return '';

  const trimValue = value.trim();
  if (trimValue === '') return '';

  return trimValue
    .split(' ')
    .map((w) => capitalizeFirstLetter(w))
    .join(' ');
};
export default capitalizeText;
