import type { AutoCompleteOption } from './_types';
function _mergeFormater(...fns: ((t: string) => string)[]) {
  return fns.reduceRight((f, g) => (t) => f(g(t)));
};
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
    : ''
}
function _isContains(value?: string, subValue?: string) {
  return typeof value !== 'string' || typeof subValue !== 'string' ? false : `${value}`.indexOf(`${subValue}`) > -1
}
function _toLowerCaseTrim(text?: string) {
  return !!text ? text.toLowerCase().trim() : ''
};
function _execute(fn: (...agrs: any[]) => boolean, ...agrs: any[]) {
  return fn(...agrs) === false ? false : true;
};
const customOptionFilter =
  (customeFilter: (option: AutoCompleteOption) => boolean) =>
    (options: AutoCompleteOption[], { inputValue }: any) => {
      if (!(options instanceof Array && options.length > 0)) return [];

      const _keyword = _removeVietnameseAccentMarks(_toLowerCaseTrim(inputValue));
      if (_keyword) {
        return options.filter((option) => {
          let _text = _removeVietnameseAccentMarks(_toLowerCaseTrim(option?.['name'] as string));
          if (typeof customeFilter !== 'function') return _isContains(_text, _keyword);
          return _isContains(_text, _keyword) && _execute(customeFilter, option);
        });
      } else {
        if (typeof customeFilter !== 'function') return options;
        return options.filter((option) => _execute(customeFilter, option));
      }
    };
export default customOptionFilter;
