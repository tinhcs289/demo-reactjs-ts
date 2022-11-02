import isEmptyGuid from './isEmptyGuid';
import isGuid from './isGuid';

const isNotEmptyGuid = (value: any) => isGuid(value) && !isEmptyGuid(value);
export default isNotEmptyGuid;
