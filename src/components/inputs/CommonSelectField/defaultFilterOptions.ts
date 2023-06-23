import type { FilterOptionsState } from '@mui/material';
import type { AutoCompleteOption } from './_types';
export default function defaultFilterOptions(
  options: AutoCompleteOption[],
  _state: FilterOptionsState<AutoCompleteOption>
) {
  return options;
}
function _mergeFormater(...fns: ((t: string) => string)[]) {
  return fns.reduceRight((f, g) => (t) => f(g(t)));
}
function _removeVietnameseAccentMarks(value?: string) {
  return typeof value === 'string'
    ? _mergeFormater(
        (t) => t.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a'),
        (t) => t.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A'),
        (t) => t.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e'),
        (t) => t.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E'),
        (t) => t.replace(/ì|í|ị|ỉ|ĩ/g, 'i'),
        (t) => t.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I'),
        (t) => t.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o'),
        (t) => t.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O'),
        (t) => t.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u'),
        (t) => t.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U'),
        (t) => t.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y'),
        (t) => t.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y'),
        (t) => t.replace(/đ/g, 'd'),
        (t) => t.replace(/Đ/g, 'D'),
        (t) => t.trim()
      )(value)
    : '';
}
function _clean(value?: string) {
  if (!value) return '';
  return _removeVietnameseAccentMarks(value).toLowerCase().trim();
}
export function createFilterOptions(
  enableClientFilter: boolean,
  filter:
    | ((option: AutoCompleteOption, inputValue: string) => boolean)
    | 'startWith'
    | 'contains' = 'startWith'
) {
  if (!enableClientFilter) return defaultFilterOptions;
  return function filterOptions(
    options: AutoCompleteOption[],
    state: FilterOptionsState<AutoCompleteOption>
  ) {
    if (!options) return [];
    if (!(options instanceof Array)) return [];
    if (options.length === 0) return [];
    const { inputValue, getOptionLabel } = state;
    if (!inputValue) return options;
    if (!inputValue.trim()) return options;
    if (typeof filter === 'function') {
      return options.filter((o) => {
        try {
          const isMatch = filter(o, inputValue);
          return isMatch;
        } catch {
          return false;
        }
      });
    }
    const keyword = _clean(inputValue);
    if (filter === 'startWith') {
      return options.filter((o) => {
        try {
          const label = _clean(getOptionLabel(o) || o.label);
          const isMatch = label.startsWith(keyword);
          return isMatch;
        } catch {
          return false;
        }
      });
    }
    if (filter === 'contains') {
      return options.filter((o) => {
        try {
          const label = _clean(getOptionLabel(o) || o.label);
          const isMatch = label.includes(keyword);
          return isMatch;
        } catch {
          return false;
        }
      });
    }
    return options;
  };
}
