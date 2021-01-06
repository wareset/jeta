import { Rease as R0 } from 'rease'

import Test from 'test.rease'

const C0 = ['\n', 'div', '\n  ', 'span', 'Content']

export default class Rease06 extends R0 {
  get cid() {
    return '[ridka1lh2]'
  }

  init() {
    const H = [this.new, this.store, this.new.text]
    this.template(
      /* 0: "\n" */
      H[2](C0[0]),

      /* 1: ["div",[]] */
      H[0](
        C0[1],
        [],
        /* 2: "\n  " */
        H[2](C0[2]),

        /* 3: ["Test",[]] */
        H[0](
          H[1]().run(() => Test),
          [],
          /* 4: ["span",[]] */
          H[0](
            C0[3],
            [],
            /* 5: "Content" */
            H[2](C0[4])
          )
        ),

        /* 6: ["{Test}",[]] */
        H[0](
          H[1]().run(() => Test),
          [],
          /* 7: ["span",[]] */
          H[0](
            C0[3],
            [],
            /* 8: "Content" */
            H[2](C0[4])
          )
        ),

        /* 9: "\n" */
        H[2](C0[0])
      )
    )

    this.style(() =>
      'divS{color: red;}divS spanS{color: green;}'.replace(/S/g, this.cid)
    )
  }
}
