// import { isFunction, isNotEmptyArray, isNotNull, isString } from '@/helpers/commonHelper';
// import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
// import ListItemText from '@mui/material/ListItemText';
// import clsx from 'clsx';
// import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
// import { BaseChip, BasePopper, BaseTextField, useStyles } from '../AutoSuggest';
// import customOptionFilter from './customOptionFilter';
// import { AutoCompleteOption } from './types';

// const regex = /^\[object (\S+?)\]$/;

// const CommonSelectField: React.FC<AutocompleteProps<AutoCompleteOption>> = (props) => {
//   const {
//     label,
//     required,
//     error,
//     multiple,
//     helperText,
//     size,
//     defaultValue,
//     onChange,
//     options,
//     renderOption,
//     filterOptions,
//     value: unUsedValue,
//     fullWidth,
//     ...otherProps
//   } = props;

//   const memoMultiple = React.useMemo(() => {
//     return multiple === true;
//   }, [multiple]);

//   const defaultOptions: AutoCompleteOption[] = React.useMemo(() => {
//     return options instanceof Array && options.length > 0 ? options : [];
//   }, [options]);

//   const [selectedOptionValue, setSelectedOptionValue] = React.useState<AutoCompleteOption>({});
//   const [selectOptions, setSelectOptions] = React.useState(defaultOptions);

//   const handleSelectedAnOption = React.useCallback(
//     (event: React.SyntheticEvent<Element, Event>, option: AutoCompleteOption) => {
//       setSelectedOptionValue(option?.name);
//       const matches = Object.prototype.toString.call(option).match(regex) || [];
//       if (matches) {
//         try {
//           onChange(option || {});
//         } catch {
//           onChange({});
//         }
//       }
//       return;
//     },
//     [onChange],
//   );

//   const setSelectedOptionValueByDefault = React.useCallback((_options: AutoCompleteOption[] = []) => {
//     if (!(!!defaultValue && _options instanceof Array && _options.length > 0)) {
//       setSelectedOptionValue('');
//       return;
//     }

//     let option = _options.find((o) => o.value === defaultValue);
//     if (isNotNull(option)) setSelectedOptionValue(option.name || '');
//   }, [defaultValue, ]);
// };

// const CommonSelectFieldAAA = ({
//   label,
//   required = false,
//   error = false,
//   multiple = false,
//   className,
//   helperText,
//   size = 'small',
//   defaultValue,
//   onChange = () => {},
//   suggestions = [],
//   renderOption,
//   filterOptions,
//   value: unUsedValue, // loại bỏ prop `value`
//   fullWidth = true,
//   ...props
// }) => {
//   const classes = useStyles();
//   const [selectedOptionValue, setSelectedOptionValue] = React.useState(multiple ? [] : {});
//   const [selectOptions, setSelectOptions] = React.useState(isNotEmptyArray(suggestions) ? [...suggestions] : []);

//   const handleSelectedAnOption = () => {
//     if (multiple) {
//       setSelectedOptionValue(option);
//       onChange(option || []);
//     } else {
//       setSelectedOptionValue(option?.name || '');
//       const matches = Object.prototype.toString.call(option).match(regex) || [];
//       if (matches) {
//         try {
//           onChange(option || {});
//         } catch {
//           onChange({});
//         }
//       }
//     }
//   };

//   const setSelectedOptionValueByDefault = (options = []) => {
//     if (multiple) {
//       if (isNotEmptyArray(defaultValue) && isNotEmptyArray(options)) {
//         setSelectedOptionValue(
//           defaultValue.map((value) => options.find((o) => o.value === value)).filter((option) => isNotNull(option)),
//         );
//       } else {
//         setSelectedOptionValue([]);
//       }
//     } else {
//       if (isNotNull(defaultValue) && isNotEmptyArray(options)) {
//         let option = options.find((o) => o.value === defaultValue);
//         if (isNotNull(option)) setSelectedOptionValue(option.name || '');
//       } else {
//         setSelectedOptionValue('');
//       }
//     }
//   };

//   React.useEffect(() => {
//     if (isNotEmptyArray(suggestions)) {
//       const cloneData = cloneDeep([...suggestions]);
//       setSelectOptions(cloneData);
//       setSelectedOptionValueByDefault(cloneData);
//     } else {
//       setSelectOptions([]);
//     }
//   }, [suggestions, defaultValue]);

//   return (
//     <Autocomplete
//       value={selectedOptionValue}
//       onChange={handleSelectedAnOption}
//       options={selectOptions}
//       getOptionLabel={(option) => (isString(option) ? option : option?.name || '')}
//       className={clsx(classes.autocomplete, className)}
//       filterOptions={customOptionFilter(filterOptions)}
//       clearOnBlur
//       multiple={multiple}
//       {...(multiple
//         ? {
//             renderTags: (tagValue, getTagProps) =>
//               tagValue.map((option, index) => (
//                 <BaseChip label={option?.name || ''} key={index} {...getTagProps({ index })} />
//               )),
//             disableCloseOnSelect: true,
//           }
//         : {})}
//       getOptionSelected={(option, value) => value?.value === option?.value}
//       renderInput={(params) => (
//         <BaseTextField
//           {...params}
//           required={required}
//           label={label}
//           error={error}
//           helperText={helperText}
//           size={size}
//         />
//       )}
//       {...(isFunction(renderOption)
//         ? { renderOption }
//         : {
//             renderOption: (option) => {
//               return (
//                 <>
//                   <ListItemText primary={option.name} />
//                 </>
//               );
//             },
//           })}
//       PopperComponent={BasePopper}
//       fullWidth={fullWidth}
//       {...(!multiple ? { disableClearable: true } : {})}
//       {...props}
//     />
//   );
// };
// export default CommonSelectField;
const CommonSelectField: React.FC<any> = (props) => <></>;
export default CommonSelectField;
