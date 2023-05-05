import CommonTextField from '@/components/inputs/CommonTextField';
import newGuid from '@/helpers/stringHelpers/newGuid';
import { styled } from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import { cloneDeep, get } from 'lodash';
import type { KeyboardEvent } from 'react';
import { createRef, Fragment, useCallback, useMemo } from 'react';
import type { CommonTagInputItem, CommonTagInputFieldProps } from './_types';
import render from '@/helpers/reactHelpers/render';

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

export default function CommonTagInputField(props: CommonTagInputFieldProps) {
  const { value, defaultValue: _, onChange, renderTag, placeholder, InputProps, sx, ...other } = props;
  const inputRef = createRef<HTMLInputElement | HTMLTextAreaElement>();
  const clearTextInput = useCallback(() => {
    if (!(inputRef?.current instanceof Element)) return;
    let input = inputRef.current.querySelector('input');
    if (!(input instanceof Element)) input = inputRef.current.querySelector('textarea') as any;
    if (!(input instanceof Element)) return;
    input.value = '';
    return;
  }, [inputRef]);
  const addTag = useCallback(
    (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!event?.target || !event?.key) return;
      if (event.key !== 'Enter' && event.key !== 'SemiColon' && event.key !== 'Tab') return;
      event.preventDefault();
      event.stopPropagation();
      const text = `${get(event.target, 'value', '')}`.trim();
      if (!text) return;
      const newValue = cloneDeep(value) || [];
      newValue.push({
        id: newGuid(),
        label: text,
      });
      clearTextInput();
      onChange?.(newValue);
    },
    [value, onChange, clearTextInput]
  );
  const deleteTag = useCallback(
    (tag: CommonTagInputItem) => {
      if (!tag || !tag?.id || !Array.isArray(value)) return;
      const newTags = value.filter((t) => t.id !== tag.id);
      onChange?.(newTags);
    },
    [onChange, value]
  );
  const handleDeleteTag = useCallback(
    (tag: CommonTagInputItem) => {
      return function handleDelete(event: any) {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        deleteTag(tag);
      };
    },
    [deleteTag]
  );
  const $tags = useMemo(() => {
    if (!value || !Array.isArray(value)) return null;
    return value.map((tag, index) => {
      if (!!renderTag) {
        return <Fragment key={tag.id}>{render(renderTag, { tag, index, deleteTag })}</Fragment>;
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
  }, [value, deleteTag, renderTag, handleDeleteTag]);
  return (
    <CommonTextFieldWithTag
      {...other}
      InputProps={{
        ...InputProps,
        startAdornment: $tags,
      }}
      placeholder={placeholder}
      multiline
      ref={inputRef as any}
      onKeyDown={addTag as any}
    />
  );
}
