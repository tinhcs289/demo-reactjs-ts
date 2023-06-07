import { ButtonError, ButtonPositive } from '@/components/buttons';
import { CommonDialog, CommonDialogOnClose } from '@/components/dialogs';
import { formItemSx, useRHFArrayContext, withRHF, withRHFSubmitHandler } from '@/components/form';
import { GridContainer, GridItem } from '@/components/grid';
import withHOCs from '@/hocs/withHocs';
import { useRHFFieldError } from '@/hooks/useRHF';
import { FormContactFields, FormContactValues, withSubmitButtonContact } from '@/modules/FormContact';
import AddIcon from '@mui/icons-material/Add';
import get from 'lodash/get';
import { ComponentType, useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
const FormContactCustom = withHOCs(withRHF, withRHFSubmitHandler, withSubmitButtonContact)(FormContactFields);
export default function withAddContactButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FieldWithAddContactButton(props: any) {
    const { name, append } = useRHFArrayContext();
    const {
      formState: { isSubmitted },
    } = useFormContext();
    const [shouldShouldCreation, setShouldShowCreation] = useState<boolean>(false);
    const fieldError = useRHFFieldError(name);
    const showCreation = () => {
      setShouldShowCreation(true);
    };
    const hideCreation = () => {
      setShouldShowCreation(false);
    };
    const handleAddContact = (contact: FormContactValues) => {
      append(contact);
      hideCreation();
    };
    const handleDiscard: CommonDialogOnClose = useCallback((event, reason) => {
      if (!reason) return;
      if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') return;
      hideCreation();
    }, []);
    const errorMessage = useMemo(() => get(fieldError, 'message') as string | undefined, [fieldError]);
    const $Button = useMemo(() => {
      if (!isSubmitted || !errorMessage)
        return (
          <ButtonPositive startIcon={<AddIcon />} onClick={showCreation}>
            {'Thêm liên hệ'}
          </ButtonPositive>
        );

      return (
        <ButtonError startIcon={<AddIcon />} onClick={showCreation} errorText={errorMessage}>
          {'Thêm liên hệ'}
        </ButtonError>
      );
    }, [isSubmitted, errorMessage]);
    return (
      <>
        <GridItem sx={formItemSx}>{$Button}</GridItem>
        {!shouldShouldCreation ? null : (
          <CommonDialog open maxWidth="md" onClose={handleDiscard}>
            <GridContainer>
              <FormContactCustom onSubmit={handleAddContact} />
            </GridContainer>
          </CommonDialog>
        )}
        <WrappedComponent {...props} />
      </>
    );
  };
}
