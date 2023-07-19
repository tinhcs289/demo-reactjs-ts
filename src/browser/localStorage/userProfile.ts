import isValidAsYupSchema from '@/functions/isValidAsYupSchema';
import { newLocalStorageItem } from '@/helpers/localStorageHelpers';
import type { UserProfile } from '@/types';
import * as yup from 'yup';
export function validate(value: UserProfile | null) {
  return isValidAsYupSchema(
    value,
    yup.object().shape({
      id: yup.lazy((value) => {
        if (typeof value === 'string') return yup.string().required();
        if (typeof value === 'number') return yup.number().required();
        return yup.string().required();
      }),
      username: yup.string().required(),
      displayname: yup.string().notRequired(),
      firstName: yup.string().notRequired(),
      middleName: yup.string().notRequired(),
      lastName: yup.string().notRequired(),
      avatar: yup.string().notRequired(),
      email: yup.string().notRequired(),
      phone: yup.string().notRequired(),
      orginalData: yup.object().shape({}).notRequired(),
    })
  );
}
const userProfile = newLocalStorageItem<UserProfile>({ key: 'userProfile', validate });
export default userProfile;
