import { useMemo } from 'react';
import type { NestedOfficersInfo } from './_types';
export default function useGetterOfficerInfo(data: NestedOfficersInfo) {
  const officerId = useMemo(() => `${data?.Id || ''}`, [data?.Id]);
  const hasChilds = useMemo(
    () => !!data?._childrens && Array.isArray(data._childrens) && data._childrens.length > 0,
    [data?._childrens]
  );
  const officerName = useMemo(() => data?.Ten || '', [data?.Ten]);
  const officerNameFirstChar = useMemo(() => officerName[0] || '', [officerName]);
  const subTitle = useMemo(() => {
    if (data?.Type === 'DONVI' || data?.Type !== 'CANBO') return '';
    return data?.ChucVu || '';
  }, [data?.Type, data?.ChucVu]);

  return {
    officerId,
    officerName,
    officerNameFirstChar,
    subTitle,
    hasChilds,
  };
}
