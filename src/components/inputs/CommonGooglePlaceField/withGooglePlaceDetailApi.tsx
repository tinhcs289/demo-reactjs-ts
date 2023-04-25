import type { ComponentType, Ref } from 'react';
import { forwardRef } from 'react';
import type { GooglePlaceFieldProps } from './_types';
export default function withGooglePlaceDetailApi(WrappedComponent: ComponentType<GooglePlaceFieldProps>) {
  return forwardRef(function CommonGooglePlaceFieldWithDetailApi(
    props: GooglePlaceFieldProps,
    ref: Ref<unknown>
  ) {
    return <WrappedComponent {...props} ref={ref} />;
  });
}
