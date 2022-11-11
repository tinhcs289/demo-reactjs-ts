import isObject from './isObject';

const isEmptyObject = (obj: any) => isObject(obj) && Object.keys(obj).length < 1;
export default isEmptyObject;
