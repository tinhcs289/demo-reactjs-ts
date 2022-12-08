const toQueryString = (object: { [x: string]: string | number | boolean | Array<string | number | boolean> }) => {
  if (!object || Object.keys(object).length === 0) return '';

  return Object.keys(object)
    .map((key) =>
      !!object[key]
        ? (() => {
            if (
              typeof object[key] === 'boolean' ||
              typeof object[key] === 'number' ||
              typeof typeof object[key] === 'string'
            )
              return `${key}=${encodeURI(`${object[key]}`)}`;

            Array.from(object[key] as any);

            if (Array.isArray(object[key]) && Array.from(object[key] as any).length > 0) {
              const str = Array.from(object[key] as any)
                .map((val) => encodeURI(val as any))
                .join(',');
              return `${key}=${str}`;
            }
          })()
        : undefined,
    )
    .filter((q) => !!q)
    .join('&');
};
export default toQueryString;
