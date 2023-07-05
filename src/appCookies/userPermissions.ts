import isValidAsYupArraySchema from '@/functions/isValidAsYupArraySchema';
import { newCookieItem } from '@/helpers/cookieHelpers';
import type { Permission } from '@/types';
import * as yup from 'yup';
export function validate(value: Permission[] | null) {
  return isValidAsYupArraySchema(
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
}
const userPermissions = newCookieItem<Permission[]>({ key: 'cookie:userPermissions', validate });
export default userPermissions;
