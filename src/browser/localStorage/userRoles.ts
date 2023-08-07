import isValidAsYupArraySchema from '@/helpers/commonHelpers/isValidAsYupArraySchema';
import { newLocalStorageItem } from '@/helpers/localStorageHelpers';
import type { Roles } from '@/types';
import * as yup from 'yup';
export function validate(value: Roles[] | null) {
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
          key: yup.string().nullable(),
          name: yup.string().required(),
          permissions: yup
            .array()
            .of(
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
            .nullable(),
        })
        .required()
    )
  );
  return isValid;
}
const userRoles = newLocalStorageItem<Roles[]>({ key: 'userRoles', validate });
export default userRoles;
