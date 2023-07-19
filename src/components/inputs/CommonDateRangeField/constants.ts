import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
export const DEFAULT_FORMAT = 'DD/MM/YYYY';
export const DEFAULT_MASK = '__/__/____';
export const defautlThisMonth = moment(moment().format('YYYY/MM/DD') + ' 00:00:00', 'YYYY/MM/DD hh:mm:ss');
export const defaultNextMonth = cloneDeep(defautlThisMonth).add(1, 'month');
