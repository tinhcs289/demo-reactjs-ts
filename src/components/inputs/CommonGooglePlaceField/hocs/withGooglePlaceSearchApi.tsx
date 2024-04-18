import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import tryDo from '@/helpers/asyncHelpers/tryDo';
import {
  getPlaceById,
  getPlacesBySearchText,
  loadPlacesLibrary,
  placeService,
} from '@/helpers/googleMapApiHelpers';
import { ApiRequestStatus } from '@/types';
import type { Ref } from 'react';
import { ComponentType, forwardRef, useEffect, useMemo, useState } from 'react';
import type {
  GooglePlaceFieldProps,
  GooglePlaceOption,
  OnInputChangeHandler,
  OnSelectPlaceHandler,
  PlaceQueryFailReason,
  RequestError,
} from '../_types';
import { toOption } from '../functions';
export default function withGooglePlaceSearchApi(WrappedComponent: ComponentType<GooglePlaceFieldProps>) {
  return forwardRef(function CommonGooglePlaceFieldWithSearchApi(
    props: GooglePlaceFieldProps,
    ref: Ref<unknown>
  ) {
    const { loading: _, options: __, onChange, onQueryFail, ...otherProps } = props;
    const [preText, setPreText] = useState<string | null>(null);
    const [options, setOptions] = useState<GooglePlaceOption[]>([]);
    const [requestStatus, setRequestStatus] = useState<ApiRequestStatus>(HttpRequestStatus.NONE);
    const clearData = () => {
      setPreText(null);
      setOptions([]);
      setRequestStatus(HttpRequestStatus.NONE);
    };
    const handleCallRequest = async (text: string) => {
      setPreText(text);
      setRequestStatus(HttpRequestStatus.REQUESTING);
      try {
        const result = await getPlacesBySearchText(text);
        const error: RequestError = {};
        if (result.length === 0) {
          error.reason = 'not_found';
          throw error;
        }
        if (typeof toOption !== 'function') {
          error.reason = 'invalid_params';
          throw error;
        }
        const resultWithGeocode = await Promise.all(
          result.map((r) =>
            (async () => {
              const place: GooglePlaceOption = toOption(r);
              if (!place?.placeId) return place;
              const [_error, geocode] = await tryDo(getPlaceById(place.placeId));
              if (!!_error || !geocode) return place;
              place.placeGeocode = geocode;
              place.lng = geocode.geometry.location.lng();
              place.lat = geocode.geometry.location.lat();
              return place;
            })()
          )
        );
        setOptions(resultWithGeocode);
        setRequestStatus(HttpRequestStatus.REQUESTSUCCESS);
      } catch (error: RequestError | any) {
        setOptions([]);
        setRequestStatus(HttpRequestStatus.REQUESTFAIL);
        onQueryFail?.(text, error?.['reason'] as PlaceQueryFailReason);
      } finally {
        setRequestStatus(HttpRequestStatus.NONE);
      }
    };
    const handleQuery: OnInputChangeHandler = (event, text, reason) => {
      const searchText = !!text ? text?.trim?.() : '';
      if (reason === 'clear' || !searchText) clearData();
      if (reason === 'reset' || searchText.length < 3) return;
      if (searchText !== preText) handleCallRequest(searchText);
      return;
    };
    const handleChange: OnSelectPlaceHandler = (event, value, reason, detail) => {
      if (reason === 'clear') clearData();
      onChange?.(event, value, reason, detail);
    };
    const loading = useMemo(() => requestStatus === HttpRequestStatus.REQUESTING, [requestStatus]);
    useEffect(() => {
      if (!placeService.current || !google) loadPlacesLibrary();
    }, []);
    return (
      <WrappedComponent
        {...otherProps}
        options={options}
        loading={loading}
        onInputChange={handleQuery}
        onChange={handleChange as any}
        ref={ref}
      />
    );
  });
}
