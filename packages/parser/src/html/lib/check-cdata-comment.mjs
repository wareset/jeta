import {
  NODETYPE_CDATA_OPENER,
  NODETYPE_CDATA_CLOSER,
  NODETYPE_COMMENT_OPENER,
  NODETYPE_COMMENT_CLOSER
} from '@jeta/dom/dist/lib/constants/index.mjs';

const factoryCDATA = (opener, closer) => {
  return [
    (data, i) => {
      for (let i2 = i + 1; (i2 -= 1) >= 0; undefined) {
        if (data[i2][0] === opener) return i2;
        if (data[i2][0] === closer) return i;
      }
      return i;
    },
    (data, i) => {
      for (let i2 = i; (i2 -= 1) >= 0; undefined) {
        if (data[i2][0] === opener) return false;
        if (data[i2][0] === closer) return true;
      }
      return true;
    }
  ];
};
const [CHECK_CDATA_STEP_1, CHECK_CDATA_STEP_2] = factoryCDATA(
  NODETYPE_CDATA_OPENER,
  NODETYPE_CDATA_CLOSER
);
const [CHECK_COMMENT_STEP_1, CHECK_COMMENT_STEP_2] = factoryCDATA(
  NODETYPE_COMMENT_OPENER,
  NODETYPE_COMMENT_CLOSER
);

export {
  CHECK_CDATA_STEP_1,
  CHECK_CDATA_STEP_2,
  CHECK_COMMENT_STEP_1,
  CHECK_COMMENT_STEP_2
};
