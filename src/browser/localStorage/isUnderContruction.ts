import { newLocalStorageListenableItem } from '@/helpers/localStorageHelpers';
import { AppContruction } from '@/types';
import * as yup from 'yup';

const schema = yup.object().shape({
  version: yup.string().required(),
  isUnder: yup.boolean().required(),
});

export function validate(value: AppContruction | null) {
  try {
    schema.validateSync(value);
    return true;
  } catch (error) {
    return false;
  }
}

const isUnderContruction = newLocalStorageListenableItem<AppContruction>({
  key: 'isUnderContruction',
  validate,
});
export default isUnderContruction;
