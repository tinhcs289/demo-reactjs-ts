import isNotNull from './isNotNull';

const isNull = (value?: any) => !isNotNull(value);
export default isNull;
