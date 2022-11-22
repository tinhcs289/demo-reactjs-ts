const __preserveEndingSlash = (pattern: string, reversed: string) => {
  const endingSlashRe = /\/$/;

  const shouldHave = endingSlashRe.test(pattern);
  const has = endingSlashRe.test(reversed);

  if (shouldHave && !has) {
    return reversed + '/';
  } else if (!shouldHave && has) {
    return reversed.slice(0, reversed.length - 1);
  }

  return reversed;
};

const toLink = (pattern: string, params = {} as { [x: string]: any }) => {
  const reversed = pattern
    .replace(/\w*(:\w+\??)/g, function (path, param) {
      const key = param.replace(/[:?]/g, '');
      if (params[key] === undefined) {
        if (param.indexOf('?') < 0) {
          return path;
        } else {
          return '';
        }
      } else {
        return path.replace(param, params[key]);
      }
    })
    .replace(/\/\//, '/');
  return __preserveEndingSlash(pattern, reversed);
};
export default toLink;
