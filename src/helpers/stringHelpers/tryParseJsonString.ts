const tryParseJsonString = (value: any): string | null => {
  if (typeof value !== 'string') return null;
  try {
    return JSON.parse(value.trim());
  } catch (error) {
    console.warn(error);
    return null;
  }
};
export default tryParseJsonString;
