import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete';
import React from 'react';
import { TAutoCompleteOption, TAutocompleteQueryFailReason, TCommonAutoCompleteFieldProps } from '../_types';

import { AxiosResponse } from 'axios';

enum TRequestStatus {
  NONE = 1,
  REQUESTING = 2,
  REQUESTSUCCESS = 3,
  REQUESTFAIL = 4,
}

type TRequestError = {
  response?: AxiosResponse<any>;
  reason?: TAutocompleteQueryFailReason;
  [x: string]: any;
};

function withAxiosRequestForSuggestions<T>(
  requestCall: (searchText: string) => Promise<AxiosResponse<{ result?: T[] }>>,
  toOption: (o: T) => TAutoCompleteOption,
  minTextLengthToCallRequest: number = 3,
) {
  return (WrappedComponent: React.FC<TCommonAutoCompleteFieldProps>) => (props: TCommonAutoCompleteFieldProps) => {
    const { loading: unusedLoading, options: unusedOptions, onQuery: unusedOnquery, onChange, ...otherProps } = props;

    const [preText, setPreText] = React.useState<string | null>(null);
    const [options, setOptions] = React.useState<TAutoCompleteOption[]>([]);
    const [requestStatus, setRequestStatus] = React.useState<TRequestStatus>(TRequestStatus.NONE);

    const clearData = () => {
      setPreText(null);
      setOptions([]);
      setRequestStatus(TRequestStatus.NONE);
    };

    const handleCallRequest = async (text: string) => {
      setPreText(text);
      setRequestStatus(TRequestStatus.REQUESTING);
      try {
        const response = await requestCall(text);
        const result = arrayOrEmpty(response?.data?.result);

        const error = { response } as TRequestError;

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
        setRequestStatus(TRequestStatus.REQUESTSUCCESS);
      } catch (error: TRequestError | any) {
        setOptions([]);
        setRequestStatus(TRequestStatus.REQUESTFAIL);
        props?.onQueryFail?.(text, error?.['reason'] as TAutocompleteQueryFailReason);
      } finally {
        setRequestStatus(TRequestStatus.NONE);
      }
    };

    const handleQuery = (
      _: React.SyntheticEvent<Element, Event>,
      text: string,
      reason: AutocompleteInputChangeReason,
    ) => {
      const searchText = !!text ? text?.trim?.() : '';

      if (reason === 'clear' || !searchText) clearData();

      if (reason === 'reset' || searchText.length < minTextLengthToCallRequest) return;

      if (searchText !== preText) {
        handleCallRequest(searchText);
      }
    };

    const handleChange = (
      e: React.SyntheticEvent<Element, Event>,
      v: NonNullable<string | TAutoCompleteOption> | (string | TAutoCompleteOption)[] | null,
      r: AutocompleteChangeReason,
      d: AutocompleteChangeDetails<TAutoCompleteOption> | undefined,
    ) => {
      if (r === 'clear') {
        clearData();
      }

      onChange?.(e, v, r, d);
    };

    return (
      <WrappedComponent
        {...otherProps}
        options={options}
        loading={requestStatus === TRequestStatus.REQUESTING}
        onInputChange={handleQuery}
        onChange={handleChange}
      />
    );
  };
}
export default withAxiosRequestForSuggestions;
