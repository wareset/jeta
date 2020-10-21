import { OPENER, CLOSER } from './create-nodelist.mjs';

const __validate__ = data => {
  const arr = [];
  let key = -1;
  let errorKey = key;
  data.some((v, k) => {
    key = k;
    const isClose = v[1] === CLOSER;
    if (!isClose && v[1] !== OPENER) return false;

    if (!isClose) arr.push([v.tagName, isClose, k]), ++errorKey;
    else {
      const last = arr[arr.length - 1];
      // v[4] = false;
      if (!last || last[1] || (v.tagName && v.tagName !== last[0])) return true;
      // v[4] = true;
      --errorKey;
      arr.pop();
    }
    return false;
  });

  // console.log(1212, key, errorKey, arr);
  if (key === data.length - 1 && arr.length) {
    return [-arr[arr.length - 1][2], -1];
  }
  return [key, errorKey];
};

// let i = 0;
export default function validate(data) {
  // if (i > 10) return;
  // i++;
  // console.log(data);
  let key, key2, data2, errorKey;

  [key, errorKey] = __validate__(data);

  if (key === data.length - 1) return data;

  data2 = [...data];

  if (key >= 0) {
    const arr = [
      key - 2,
      key - 1,
      key,
      key + 1,
      key + 2,
      errorKey - 1,
      errorKey,
      errorKey + 1
    ].filter((v, k, a) => v >= 0 && v < data.length && k === a.indexOf(v));
    const variants = [];

    for (const key of arr) {
      (data2 = [...data]), data2.splice(key, 1);
      variants.push([__validate__(data2), data2]);
    }
    variants.sort((a, b) => (b[0][0] - a[0][0] || a[0][1] - b[0][1]));

    // console.log(arr, variants);

    [key2, data2] = variants[0];
    key2 = key2[0];
    if (key2 === data2.length - 1) return data2;
  } else {
    (key = -key), data2.splice(key, 1);
  }

  return validate(data2);
}
