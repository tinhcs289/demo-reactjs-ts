import { ButtonUploadFile } from '@/components/buttons';
import type { FieldArrayComponentProps } from '@/components/form';
import { FieldArrayItemProps, fieldArray, formItemSx, useRHFArrayContext } from '@/components/form';
import { CommonFormGroup } from '@/components/formGroup';
import { GridItem } from '@/components/grid';
import getFileSizeWithUnit from '@/helpers/stringHelpers/getFileSizeWithUnit';
import { useRHFFieldError } from '@/hooks/useRHF';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
import DeleteItem from '@mui/icons-material/Delete';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import AddIcon from '@mui/icons-material/UploadFile';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import get from 'lodash/get';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
type FileData = {
  id?: string;
  file?: File;
  source?: string;
};
function withUploadFileButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FieldWithUploadFileButton(props: any) {
    const { name, append } = useRHFArrayContext();
    const {
      formState: { isSubmitted },
    } = useFormContext();
    const fieldError = useRHFFieldError(name);
    const handleUpload = (files: File[]) => {
      files.forEach((file) => {
        append({ file } as FileData);
      });
    };
    const errorMessage = useMemo(() => get(fieldError, 'message') as string | undefined, [fieldError]);
    return (
      <>
        <GridItem sx={{ ...formItemSx, mb: 0 }}>
          <CommonFormGroup
            label="Tệp tin đính kèm"
            disableFloatingLabel
            error={!!isSubmitted && !!errorMessage}
            errorText={errorMessage}
          >
            <GridItem sx={{ mt: '16px' }}>
              <ButtonUploadFile
                multiple
                startIcon={<AddIcon />}
                size="small"
                variant="contained"
                onUpload={handleUpload}
              >
                {'Tải lên'}
              </ButtonUploadFile>
            </GridItem>
          </CommonFormGroup>
        </GridItem>
        <WrappedComponent {...props} />
      </>
    );
  };
}
function FileList(props: FieldArrayComponentProps) {
  const { name, fields: fieldsSub, itemComponent: ItemComponent } = props;
  const { fields: fieldArray } = useRHFArrayContext();
  if (!ItemComponent) return null;
  return (
    <List dense sx={{ width: '100%' }}>
      {fieldArray.map((item: Record<'id', string>, index) => (
        <ItemComponent
          key={item.id}
          rootName={name}
          item={item}
          itemIndex={index}
          itemName={`${name}.${index}`}
          subFields={fieldsSub}
        />
      ))}
    </List>
  );
}
function FileItem(props: FieldArrayItemProps) {
  const { item, itemIndex } = props;
  const { remove } = useRHFArrayContext();
  const fileName = useMemo(() => get(item, ['file', 'name'], '') as string, [item]);
  const fileSizeText = useMemo(() => getFileSizeWithUnit(get(item, ['file', 'size'], 0) as number), [item]);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      remove(itemIndex);
    },
    [remove, itemIndex]
  );
  return (
    <>
      <Divider variant="fullWidth" component="li" />
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton edge="end" onClick={handleDelete}>
            <DeleteItem />
          </IconButton>
        }
      >
        <ListItemIcon>
          <FilePresentIcon />
        </ListItemIcon>
        <ListItemText primary={fileName} secondary={fileSizeText} />
      </ListItem>
    </>
  );
}
export const fieldFiles2 = fieldArray({
  name: 'OtherFiles',
  hocs: [withUploadFileButton],
  component: FileList,
  itemComponent: FileItem,
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'OtherFiles',
      codeExample: `import { ButtonUploadFile } from '@/components/buttons';
import type { FieldArrayComponentProps } from '@/components/form';
import { FieldArrayItemProps, fieldArray, formItemSx, useRHFArrayContext } from '@/components/form';
import { CommonFormGroup } from '@/components/formGroup';
import { GridItem } from '@/components/grid';
import getFileSizeWithUnit from '@/helpers/stringHelpers/getFileSizeWithUnit';
import { useRHFFieldError } from '@/hooks/useRHF';
import DeleteItem from '@mui/icons-material/Delete';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import AddIcon from '@mui/icons-material/UploadFile';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import get from 'lodash/get';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
type FileData = {
  id?: string;
  file?: File;
  source?: string;
};
function withUploadFileButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FieldWithUploadFileButton(props: any) {
    const { name, append } = useRHFArrayContext();
    const {
      formState: { isSubmitted },
    } = useFormContext();
    const fieldError = useRHFFieldError(name);
    const handleUpload = (files: File[]) => {
      files.forEach((file) => {
        append({ file } as FileData);
      });
    };
    const errorMessage = useMemo(() => get(fieldError, 'message') as string | undefined, [fieldError]);
    return (
      <>
        <GridItem sx={{ ...formItemSx, mb: 0 }}>
          <CommonFormGroup
            label="Tệp tin đính kèm"
            disableFloatingLabel
            error={!!isSubmitted && !!errorMessage}
            errorText={errorMessage}
          >
            <GridItem sx={{ mt: '16px' }}>
              <ButtonUploadFile
                multiple
                startIcon={<AddIcon />}
                size="small"
                variant="contained"
                onUpload={handleUpload}
              >
                {'Tải lên'}
              </ButtonUploadFile>
            </GridItem>
          </CommonFormGroup>
        </GridItem>
        <WrappedComponent {...props} />
      </>
    );
  };
}
function FileList(props: FieldArrayComponentProps) {
  const { name, fields: fieldsSub, itemComponent: ItemComponent } = props;
  const { fields: fieldArray } = useRHFArrayContext();
  if (!ItemComponent) return null;
  return (
    <List dense sx={{ width: '100%' }}>
      {fieldArray.map((item: Record<'id', string>, index) => (
        <ItemComponent
          key={item.id}
          rootName={name}
          item={item}
          itemIndex={index}
          itemName={\`\${name}.\${index}\`}
          subFields={fieldsSub}
        />
      ))}
    </List>
  );
}
function FileItem(props: FieldArrayItemProps) {
  const { item, itemIndex } = props;
  const { remove } = useRHFArrayContext();
  const fileName = useMemo(() => get(item, ['file', 'name'], '') as string, [item]);
  const fileSizeText = useMemo(() => getFileSizeWithUnit(get(item, ['file', 'size'], 0) as number), [item]);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      remove(itemIndex);
    },
    [remove, itemIndex]
  );
  return (
    <>
      <Divider variant="fullWidth" component="li" />
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton edge="end" onClick={handleDelete}>
            <DeleteItem />
          </IconButton>
        }
      >
        <ListItemIcon>
          <FilePresentIcon />
        </ListItemIcon>
        <ListItemText primary={fileName} secondary={fileSizeText} />
      </ListItem>
    </>
  );
}
const fieldFile2 = fieldArray({
  name: 'OtherFiles',
  hocs: [withUploadFileButton],
  component: FileList,
  itemComponent: FileItem,
  sx: formItemSx,
});`,
    }),
  ],
});
