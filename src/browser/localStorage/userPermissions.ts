import isValidAsYupArraySchema from '@/functions/isValidAsYupArraySchema';
import { newLocalStorageItem } from '@/helpers/localStorageHelpers';
import type { Permission } from '@/types';
import * as yup from 'yup';
export function validate(value: Permission[] | null) {
  const isValid = isValidAsYupArraySchema(
    value,
    yup.array().of(
      yup
        .object()
        .shape({
          id: yup.lazy((value) => {
            if (typeof value === 'string') return yup.string().nullable();
            if (typeof value === 'number') return yup.number().nullable();
            return yup.string().nullable();
          }),
          key: yup.string().required(),
          name: yup.string().required(),
        })
        .required()
    )
  );
  return isValid;
}
const userPermissions = newLocalStorageItem<Permission[]>({ key: 'userPermissions', validate });
export default userPermissions;
