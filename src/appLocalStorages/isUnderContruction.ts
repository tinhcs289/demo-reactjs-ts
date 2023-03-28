import { newLocalStorageListenableItem } from '@/helpers/localStorageHelpers';
import { TAppContruction } from '@/types';
import * as yup from 'yup';

const schema = yup.object().shape({
  version: yup.string().required(),
  isUnder: yup.boolean().required(),
});

export function validate(value: TAppContruction | null) {
  try {
    schema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
}

const isUnderContruction = newLocalStorageListenableItem<TAppContruction>({
  key: 'isUnderContruction',
  validate,
});
export default isUnderContruction;
