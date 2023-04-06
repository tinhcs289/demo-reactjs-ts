import CommonTextField from '@/components/inputs/CommonTextField';
import { styled } from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import type { KeyboardEvent } from 'react';
import { Fragment, useCallback, useMemo } from 'react';
import type { CustomInputProps, DateTagInputItem } from './_types';
const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  margin: theme.spacing(0.5, 0.25),
}));
const CommonTextFieldWithTag = styled(CommonTextField)(({ theme }) => ({
  display: 'flex',
  '& div.MuiInputBase-root': {
    display: 'flex',
    flexGrow: 0,
    flexWrap: 'wrap',
  },
  '& textarea': {
    alignItems: 'baseline',
    width: 'auto',
    flex: '1',
    minWidth: '30px',
    '&::placeholder': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
}));
export default function CustomInput(props: CustomInputProps) {
  const {
    dates,
    value: __,
    defaultValue: _,
    onChangeTags,
    renderTag,
    placeholder,
    InputProps,
    sx,
    ...other
  } = props;
  const addTag = useCallback((event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return;
  }, []);
  const deleteTag = useCallback(
    (tag: DateTagInputItem) => {
      if (!tag || !tag?.id || !Array.isArray(dates)) return;
      const newTags = dates.filter((t) => t.id !== tag.id);
      onChangeTags?.(newTags);
    },
    [onChangeTags, dates]
  );
  const handleDeleteTag = useCallback(
    (tag: DateTagInputItem) => {
      return function handleDelete(event: any) {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        deleteTag(tag);
      };
    },
    [deleteTag]
  );
  const $tags = useMemo(() => {
    if (!dates || !Array.isArray(dates)) return null;
    return dates.map((tag, index) => {
      if (typeof renderTag === 'function') {
        return <Fragment key={tag.id}>{renderTag(tag, index, deleteTag)}</Fragment>;
      }
      return (
        <ChipStyled
          size="small"
          color="primary"
          key={tag.id}
          tabIndex={-1}
          label={tag?.label || ''}
          onDelete={handleDeleteTag(tag)}
        />
      );
    });
  }, [dates, deleteTag, renderTag, handleDeleteTag]);
  return (
    <CommonTextFieldWithTag
      {...other}
      InputProps={{
        ...InputProps,
        startAdornment: $tags,
      }}
      placeholder={placeholder}
      multiline
      value=""
      onKeyDown={addTag as any}
    />
  );
}
