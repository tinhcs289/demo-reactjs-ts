import { ButtonError, ButtonPositive, ButtonSubmit } from '@/components/buttons';
import { CommonDialog, CommonDialogOnClose } from '@/components/dialogs';
import {
  FormGridFields,
  field,
  fieldArray,
  formItemSx,
  useRHFArrayContext,
  withRHF,
  withRHFSubmitHandler,
} from '@/components/form';
import { GridContainer, GridItem } from '@/components/grid';
import { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import { email, phone } from '@/constants/rhfRules';
import withHOCs from '@/hocs/withHocs';
import { useRHFFieldError } from '@/hooks/useRHF';
import AddIcon from '@mui/icons-material/Add';
import get from 'lodash/get';
import { ComponentType, useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldArrayItemProps, FormGridFieldsWithNamePrefix } from '@/components/form';
import { GridContainerPaper } from '@/components/grid';
type FormContactValues = {
  Id?: string;
  Title?: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  Gender?: AutoCompleteOption;
  PhoneNumber?: string;
  EmailAddress?: string;
  Address?: string;
};
export const contactFields = [
  field({
    name: 'Title',
    inputType: 'text',
    label: 'Danh xưng',
    md: 3,
    sx: formItemSx,
  }),
  field({
    name: 'LastName',
    inputType: 'text',
    label: 'Họ',
    md: 3,
    sx: formItemSx,
  }),
  field({
    name: 'MiddleName',
    inputType: 'text',
    label: 'Đệm',
    md: 3,
    sx: formItemSx,
  }),
  field({
    name: 'FirstName',
    inputType: 'text',
    label: 'Tên',
    md: 3,
    sx: formItemSx,
  }),

  field({
    name: 'Gender',
    inputType: 'select',
    label: 'Giới tính',
    md: 2,
    sx: formItemSx,
    componentProps: {
      options: [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
      ],
    },
  }),
  field({
    name: 'PhoneNumber',
    inputType: 'text',
    label: 'Số điện thoại',
    rules: { ...phone('Số điện thoại không đúng') },
    md: 5,
    sx: formItemSx,
  }),
  field({
    name: 'EmailAddress',
    inputType: 'text',
    label: 'Email',
    rules: { ...email('Email không đúng') },
    md: 5,
    sx: formItemSx,
  }),
  field({
    name: 'Address',
    inputType: 'text',
    label: 'Địa chỉ',
    sx: formItemSx,
    componentProps: { multiline: true, rows: 3 },
  }),
];
function withSubmitButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FormContactWithSubmitButton(props: any) {
    return (
      <>
        <WrappedComponent {...props} />
        <GridItem sx={{ p: 2 }}>
          <ButtonSubmit>{`Lưu`}</ButtonSubmit>
        </GridItem>
      </>
    );
  };
}
const FormContactCustom = withHOCs(
  withRHF(),
  withRHFSubmitHandler,
  withSubmitButton
)((_props: any) => <FormGridFields fields={contactFields} />);
function withAddContactButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
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
function ContactSubForm(props: FieldArrayItemProps) {
  const { itemName, item, subFields } = props;
  return (
    <GridContainerPaper key={item.id} sx={{ width: '100%', p: 2, mb: 1 }} elevation={10}>
      <FormGridFieldsWithNamePrefix namePrefix={itemName} fields={subFields as any} />
    </GridContainerPaper>
  );
}
export const fieldArrayObject2 = fieldArray({
  name: 'Contacts',
  fields: contactFields,
  hocs: [withAddContactButton],
  itemComponent: ContactSubForm,
  sx: formItemSx,
  // rules: {
  //   validate: {
  //     fieldIsRequired: (value: any[]) => {
  //       if (!value) return 'Dữ liệu bắt buộc';
  //       if (!(value instanceof Array)) return 'Dữ liệu bắt buộc';
  //       if (value.length === 0) return 'Dữ liệu bắt buộc';
  //       return true;
  //     },
  //     minimumTotalOfItemsIs2: (value: any[]) => {
  //       if (!value) return true;
  //       if (!(value instanceof Array)) return true;
  //       if (value.length >= 2) return true;
  //       return 'tối thiểu 2 bản ghi';
  //     },
  //     maximumTotalOfItemsIs4: (value: any[]) => {
  //       if (!value) return true;
  //       if (!(value instanceof Array)) return true;
  //       if (value.length <= 3) return true;
  //       return 'tối đa 4 bản ghi';
  //     },
  //   },
  // },
});
