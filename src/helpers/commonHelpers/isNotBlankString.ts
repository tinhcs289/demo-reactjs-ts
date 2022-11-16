const isNotBlankString = (value: any) => typeof value === 'string' && value.trim() !== '';
export default isNotBlankString;
