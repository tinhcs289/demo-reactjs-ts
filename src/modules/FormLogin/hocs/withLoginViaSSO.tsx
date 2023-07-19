import { ButtonPositive } from '@/components/buttons';
import { formItemSx } from '@/components/form';
import { GridItem } from '@/components/grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Divider } from '@mui/material';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback } from 'react';
import type { FormProps } from '../_types';
export default function withLoginViaSSO(WrappedComponent: ComponentType<FormProps>) {
  return function FormLoginWithLoginViaSSO(props: FormProps) {
    const handleRequestLoginViaSSO: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      //TODO [Login] logic sso here
    }, []);
    return (
      <>
        <WrappedComponent {...props} />
        <GridItem>
          <Divider />
        </GridItem>
        <GridItem sx={formItemSx}>
          <ButtonPositive
            noTextTransform
            startIcon={<FacebookIcon />}
            fullWidth
            onClick={handleRequestLoginViaSSO}
          >
            Đăng nhập bằng Facebook
          </ButtonPositive>
        </GridItem>
      </>
    );
  };
}
