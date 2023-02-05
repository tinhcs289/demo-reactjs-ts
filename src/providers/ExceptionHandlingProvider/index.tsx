import type { ReactNode } from 'react';
import React from 'react';

type Props = { children?: ReactNode };
type State = { hasError?: boolean };

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
    console.log(error, errorInfo);
  }

  render() {
    if (!!this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          {this.props.children}
        </>
      );
    }

    return this.props.children;
  }
}
