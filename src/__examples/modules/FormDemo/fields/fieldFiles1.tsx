import { ButtonUploadFile } from '@/components/buttons';
import { FieldArrayItemProps, fieldArray, formItemSx, useRHFArrayContext } from '@/components/form';
import { CommonFormGroup } from '@/components/formGroup';
import { GridItem } from '@/components/grid';
import toBase64 from '@/helpers/fileHelpers/toBase64';
import { useRHFFieldError } from '@/hooks/useRHF';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
import AddIcon from '@mui/icons-material/UploadFile';
import { Button, Card, CardActions, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import get from 'lodash/get';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
type FileData = {
  id?: string;
  file?: File;
  source?: string;
};
function FileItem(props: FieldArrayItemProps) {
  const { item, itemIndex } = props;
  const { remove } = useRHFArrayContext();
  const file = useMemo(() => get(item, ['file']) as File, [item]);
  const fileName = useMemo(() => get(item, ['file', 'name'], '') as string, [item]);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>();
  useEffect(() => {
    if (isParsing) return;
    setIsParsing(true);
    const timeout = setTimeout(() => {
      toBase64(file).then((base64) => {
        setIsParsing(false);
        if (!base64) return;
        if (!imageRef?.current) return;
        imageRef.current.src = base64;
      });
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      remove(itemIndex);
    },
    [remove, itemIndex]
  );
  return (
    <Grid item key={item.id} xs={12} sm={6} md={3} sx={{ p: 1 }}>
      <Card>
        <CardMedia component="img" alt={fileName} height="140" ref={imageRef as any} />
        <CardActions>
          <Button size="small" onClick={handleDelete}>
            Xóa
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
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
export const fieldFiles1 = fieldArray({
  name: 'SomeFiles',
  hocs: [withUploadFileButton],
  itemComponent: FileItem,
  sx: formItemSx,
  rules: {
    validate: {
      fieldIsRequired: (value: any[]) => {
        if (!value) return 'Dữ liệu bắt buộc';
        if (!(value instanceof Array)) return 'Dữ liệu bắt buộc';
        if (value.length === 0) return 'Dữ liệu bắt buộc';
        return true;
      },
    },
  },
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'SomeFiles',
      codeExample: `import { ButtonUploadFile } from '@/components/buttons';
import { FieldArrayItemProps, fieldArray, formItemSx, useRHFArrayContext } from '@/components/form';
import { CommonFormGroup } from '@/components/formGroup';
import { GridItem } from '@/components/grid';
import toBase64 from '@/helpers/fileHelpers/toBase64';
import { useRHFFieldError } from '@/hooks/useRHF';
import AddIcon from '@mui/icons-material/UploadFile';
import { Button, Card, CardActions, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import get from 'lodash/get';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
type FileData = {
  id?: string;
  file?: File;
  source?: string;
};
function FileItem(props: FieldArrayItemProps) {
  const { item, itemIndex } = props;
  const { remove } = useRHFArrayContext();
  const file = useMemo(() => get(item, ['file']) as File, [item]);
  const fileName = useMemo(() => get(item, ['file', 'name'], '') as string, [item]);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>();
  useEffect(() => {
    if (isParsing) return;
    setIsParsing(true);
    const timeout = setTimeout(() => {
      toBase64(file).then((base64) => {
        setIsParsing(false);
        if (!base64) return;
        if (!imageRef?.current) return;
        imageRef.current.src = base64;
      });
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      remove(itemIndex);
    },
    [remove, itemIndex]
  );
  return (
    <Grid item key={item.id} xs={12} sm={6} md={3} sx={{ p: 1 }}>
      <Card>
        <CardMedia component="img" alt={fileName} height="140" ref={imageRef as any} />
        <CardActions>
          <Button size="small" onClick={handleDelete}>
            Xóa
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
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
fieldArray({
  name: 'SomeFiles',
  hocs: [withUploadFileButton],
  itemComponent: FileItem,
  sx: formItemSx,
  rules: {
    validate: {
      fieldIsRequired: (value: any[]) => {
        if (!value) return 'Dữ liệu bắt buộc';
        if (!(value instanceof Array)) return 'Dữ liệu bắt buộc';
        if (value.length === 0) return 'Dữ liệu bắt buộc';
        return true;
      },
    },
  },
})`,
    }),
  ],
});
