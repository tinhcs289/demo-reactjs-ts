import newGuid from '@/helpers/stringHelpers/newGuid';
import type { TCreateFilterConfigsArgs } from './_types';
/**
 * @example  
  const config = createFilterConfigs([
    {
      field: 'name',
      name: 'Ten',
      valueType: 'STRING',
      inputType: 'TEXT',
      condition: {
        LIKE: 'like',
      },
    },
    {
      field: 'gender',
      name: 'Gioi tinh',
      valueType: 'STRING',
      inputType: 'SELECT_SINGLE',
      condition: {
        LIKE: 'like',
      },
      options:[
        {
          value: 1,
          label: 'Nam',
        },
        {
          value: 2,
          label: 'Nu',
        },
        {
          value: 3,
          label: 'Khac',
        },
      ],
    },
  ]);
*/
export const createFilterConfigs = (configs: TCreateFilterConfigsArgs[]) => {
  return configs.map((config, i) => ({
    ...config,
    index: i,
    id: newGuid(),
  }));
};
