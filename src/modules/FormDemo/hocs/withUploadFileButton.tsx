import { ButtonUploadFile } from '@/components/buttons';
import { formItemSx, useRHFArrayContext } from '@/components/form';
import { CommonFormGroup } from '@/components/formGroup';
import { GridItem } from '@/components/grid';
import { useRHFFieldError } from '@/hooks/useRHF';
import AddIcon from '@mui/icons-material/UploadFile';
import get from 'lodash/get';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FileData } from '../_types';
export default function withUploadFileButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
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
            disableLabelTransform
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
