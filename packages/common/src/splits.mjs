import split from '@wareset-utilites/split';
import { trim } from 'wareset-utilites';

const brackets = [/\(|\{|\[/, /\)|\}|\]/];

export const splitDefault = (str, s = /\s*(,|\s)\s*/, safe = true) =>
  split(str, s, ...brackets, safe);

export const splitSpaces = split(null, /\s*(,|\s)\s*/, ...brackets, true, true);

const __splitAttr__ = split(null, /=/, ...brackets, true, true);
export const splitAttr = attr => {
  const [key, ...values] = __splitAttr__(attr);
  let value = trim(values.join('=') || '', '\'"`');
  // console.log(value);
  try {
    value = JSON.parse(value);
  } catch (err) {}
  if (value === '') value = true;

  return [key, value];
};
