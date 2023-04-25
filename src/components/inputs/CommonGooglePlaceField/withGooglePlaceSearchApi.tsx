import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import tryDo from '@/functions/tryDo';
import { ApiRequestStatus } from '@/types';
import { Loader } from '@googlemaps/js-api-loader';
import type { Ref } from 'react';
import { ComponentType, forwardRef, useEffect, useMemo, useState } from 'react';
import type {
  GooglePlaceFieldProps,
  GooglePlaceOption,
  OnInputChangeHandler,
  OnSelectPlaceHandler,
  PlaceQueryFailReason,
  RequestError,
} from './_types';
import { APIKEY } from './constants';
import { toOption } from './functions';
const LOADER = new Loader({ apiKey: APIKEY, libraries: ['places'] });
const placeService: { current: google.maps.places.AutocompleteService } = { current: null as any };
function loadPlacesLibrary() {
  LOADER.load().then(async () => {
    if (!google) return;
    const { AutocompleteService } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
    placeService.current = new AutocompleteService();
  });
}
async function requestCall(searchText: string): Promise<google.maps.places.AutocompletePrediction[]> {
  if (!searchText || !searchText.trim()) return [];
  if (!placeService.current) return [];
  const promise = new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
    placeService.current
      .getPlacePredictions({ input: searchText })
      .then((results) => {
        resolve(results?.predictions || []);
      })
      .catch(reject);
  });
  const [error, results] = await tryDo(promise);
  if (!!error || !results) return [];
  return results;
}
export default function withGooglePlaceSearchApi(WrappedComponent: ComponentType<GooglePlaceFieldProps>) {
  return forwardRef(function CommonGooglePlaceFieldWithSearchApi(
    props: GooglePlaceFieldProps,
    ref: Ref<unknown>
  ) {
    const { loading: _, options: __, onChange, onQueryFail, ...otherProps } = props;
    const [preText, setPreText] = useState<string | null>(null);
    const [options, setOptions] = useState<GooglePlaceOption[]>([]);
    const [requestStatus, setRequestStatus] = useState<ApiRequestStatus>(EApiRequestStatus.NONE);
    const clearData = () => {
      setPreText(null);
      setOptions([]);
      setRequestStatus(EApiRequestStatus.NONE);
    };
    const handleCallRequest = async (text: string) => {
      setPreText(text);
      setRequestStatus(EApiRequestStatus.REQUESTING);
      try {
        const result = await requestCall(text);
        const error: RequestError = {};
        if (result.length === 0) {
          error.reason = 'not_found';
          throw error;
        }
        if (typeof toOption !== 'function') {
          error.reason = 'invalid_params';
          throw error;
        }
        const newOptions = result.map((r) => toOption(r));
        setOptions(newOptions);
        setRequestStatus(EApiRequestStatus.REQUESTSUCCESS);
      } catch (error: RequestError | any) {
        setOptions([]);
        setRequestStatus(EApiRequestStatus.REQUESTFAIL);
        onQueryFail?.(text, error?.['reason'] as PlaceQueryFailReason);
      } finally {
        setRequestStatus(EApiRequestStatus.NONE);
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
    const loading = useMemo(() => requestStatus === EApiRequestStatus.REQUESTING, [requestStatus]);
    useEffect(() => {
      if (!placeService.current || !google) loadPlacesLibrary();
    }, []);
    return (
      <WrappedComponent
        {...otherProps}
        options={options}
        loading={loading}
        onInputChange={handleQuery}
        onChange={handleChange}
        ref={ref}
      />
    );
  });
}
