import toQueryString from '@/helpers/stringHelpers/toQueryString';

const toEncodeUri = (
  url: string,
  queryStringObject: {
    [x: string]: string | number | boolean | (string | number | boolean)[];
  }
) => `${url}?${toQueryString(queryStringObject)}`;
export default toEncodeUri;
