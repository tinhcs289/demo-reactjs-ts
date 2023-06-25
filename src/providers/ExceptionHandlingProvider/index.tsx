import { ButtonPositive } from '@/components/buttons';
import { CommonFallback } from '@/components/fallback';
import { GridContainer, GridItem } from '@/components/grid';
import { H2, H4 } from '@/components/typo';
import BlockIcon from '@mui/icons-material/Block';
import type { ReactNode } from 'react';
import React from 'react';
type Props = { children?: ReactNode };
type State = { hasError?: boolean };
function Content() {
  return (
    <GridContainer>
      <GridItem contentProps={{ justifyContent: 'center' }} sx={{ mb: 4 }}>
        <BlockIcon color="error" />
      </GridItem>
      <GridItem contentProps={{ justifyContent: 'center' }} sx={{ mb: 4 }}>
        <H4>Đã có lỗi xảy ra</H4>
      </GridItem>
      <GridItem contentProps={{ justifyContent: 'center' }}>
        <ButtonPositive
          onClick={() => {
            window?.location?.reload?.();
          }}
        >
          Tải lại trang
        </ButtonPositive>
      </GridItem>
    </GridContainer>
  );
}

export default class ExceptionHandlingProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn(error, errorInfo);
  }

  render() {
    if (!!this.state.hasError) {
      return (
        <>
          <CommonFallback sx={{ zIndex: 9999 }} icon={<Content />}></CommonFallback>
          {this.props.children}
        </>
      );
    }

    return this.props.children;
  }
}
