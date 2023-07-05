export default function createFormDataFromObject(o: { [x: string]: any }): FormData | null {
  if (!(o instanceof Object)) return null;
  if (Object.keys(o).length === 0) return null;
  const d = new FormData();
  for (let p in o) {
    if (!o?.[p]) continue;
    if (
      o[p].length &&
      o[p].length > 0 &&
      (o[p] instanceof FileList || (o[p] instanceof Array && o[p][0] instanceof File))
    ) {
      if (o[p].length === 1) {
        d.append(p, o[p][0]);
      } else {
        for (let i = 0; i < o[p].length; i++) {
          d.append(p, o[p][i]);
        }
      }
    } else if (
      o[p].length &&
      o[p].length > 0 &&
      o[p] instanceof Array &&
      ['number', 'string'].indexOf(typeof o[p][0]) !== -1
    ) {
      for (let i = 0; i < o[p].length; i++) {
        d.append(p, o[p][i]);
      }
    } else {
      d.append(p, o[p]);
    }
  }
  return d;
}
