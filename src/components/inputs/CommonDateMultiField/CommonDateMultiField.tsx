import CommonDateMultiPickerField from '@/components/inputs/CommonDateMultiPickerField';
import CommonTagInputField from '@/components/inputs/CommonTagInputField';
import type { TCommonTagInput } from '@/components/inputs/CommonTagInputField';
import byMomentASC from '@/helpers/arraySortHelpers/byMomentASC';
import newGuid from '@/helpers/stringHelpers/newGuid';
import type { SxProps, Theme } from '@mui/material';
import Popover from '@mui/material/Popover';
import get from 'lodash/get';
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';
import { TAGS_FORMAT } from './constants';
import type { TCommonDateMultiFieldProps } from './_types';

const popoverSx: SxProps<Theme> = {
  p: 2,
  '& div.MuiPickerStaticWrapper-content': { border: 'none', '&:hover': { border: 'none' } },
};

const anchorOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

export default function CommonDateMultiField(props: TCommonDateMultiFieldProps) {
  const {
    sx,
    label,
    placeholder,
    value,
    tagFormat,
    onChange,
    error,
    required,
    errorText,
    popoverProps,
    inputProps,
    ...otherProps
  } = props;

  const memoTagFormat = useMemo(() => tagFormat || TAGS_FORMAT, [tagFormat]);

  const tags: TCommonTagInput[] = useMemo(() => {
    if (!value || !Array(value) || value?.length === 0) return [];
    return value.map((date) => ({ id: newGuid(), label: date?.format(memoTagFormat), value: date }));
  }, [value, memoTagFormat]);

  const handleTagsChange = useCallback(
    (tags?: TCommonTagInput[]) => {
      if (!tags || !Array(tags) || tags?.length === 0) {
        onChange?.([]);
        return;
      }

      let dates = tags.map((t) => get(t, 'value')).filter((val) => moment.isMoment(val));

      if (dates.length === 0) {
        onChange?.([]);
        return;
      }

      dates.sort(byMomentASC());
      onChange?.(dates);
      return;
    },
    [onChange]
  );

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClosePicker = useCallback((e: any) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    setAnchorEl(null);
  }, []);

  const handleOpenPicker = useCallback((e: any) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    if (!e?.target || !(e.target instanceof Element)) return;

    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    setAnchorEl(target.parentElement || target);
  }, []);

  const PaperProps = useMemo(
    () => ({
      ...popoverProps?.PaperProps,
      sx: {
        ...popoverProps?.PaperProps?.sx,
        ...popoverSx,
      },
    }),
    [popoverProps?.PaperProps]
  );

  return (
    <>
      <CommonTagInputField
        {...inputProps}
        sx={sx}
        label={label}
        placeholder={placeholder}
        value={tags}
        onChange={handleTagsChange}
        onClick={handleOpenPicker}
        required={required}
        error={error}
        errorText={errorText}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={anchorOrigin as any}
        {...popoverProps}
        PaperProps={PaperProps}
      >
        <CommonDateMultiPickerField {...otherProps} value={value} onChange={onChange} />
      </Popover>
    </>
  );
}
