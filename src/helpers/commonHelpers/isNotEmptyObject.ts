import isObject from './isObject';

const isNotEmptyObject = (obj: any) => isObject(obj) && Object.keys(obj).length > 0;
export default isNotEmptyObject;
