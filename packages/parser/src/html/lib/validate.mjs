import { TYPE_OPENER, TYPE_CLOSER } from './tagfinder.mjs';

const __validate__ = data => {
  const arr = [];
  let key = -1;
  data.some((v, k) => {
    key = k;
    const isClose = v[3] === TYPE_CLOSER;
    if (!isClose && v[3] !== TYPE_OPENER) return false;

    if (!isClose) arr.push([v[2], isClose, k]);
    else {
      const last = arr[arr.length - 1];
      // v[4] = false;
      if (!last || last[1] || (v[2] && v[2] !== last[0])) return true;
      // v[4] = true;
      arr.pop();
    }
    return false;
  });

  console.log(1212, key, arr);
  if (key === data.length - 1 && arr.length) return -arr[arr.length - 1][2];
  return key;
};

export const validate = data => {
  let key, key2, data2;

  key = __validate__(data);

  if (key === data.length - 1) return data;

  data2 = [...data];

  if (key > 0) {
    data2.splice(key - 1, 1), (key2 = __validate__(data2));
    if (key2 === data2.length - 1) return data2;
    if (key2 < key) (data2 = [...data]), data2.splice(key, 1);
  } else {
    (key = -key), data2.splice(key, 1);
  }

  return validate(data2);
};
