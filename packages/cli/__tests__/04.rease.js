import { Rease as RS } from 'rease'

import Teee from './02.rease'

const tp = [12, '\n', 'slot', 'name', 'SlotName', 'atr', true]

export default class Rease04 extends RS {
  get cid() {
    return ['rikk7m4i1', true]
  }

  init(self) {
    const test = 'C0C1'

    const sf = [self.tag, self.store, self.text, self.spread]
    self.template(
      /* 0: "\n" */
      self.text('\n'),

      /* 1: ["macro",[["name","list-item"]]] */
      self.tag(
        'macro',
        [['name', 'list-item']],
        /* 2: "\n  " */
        self.text('\n  '),

        /* 3: ["li",[]] */
        self.tag(
          'li',
          [],
          /* 4: "{this.itemkey}" */
          self.text(self.store(() => this.itemkey))
        ),

        /* 5: "\n" */
        self.text('\n')
      ),

      /* 6: "\n" */
      self.text('\n'),

      /* 7: ["list-item",[["itemkey","{123}"],["key","{test}"]]] */
      self.tag('list-item', [
        ['itemkey', 123],
        ['key', test]
      ]),

      /* 8: "\n" */
      self.text('\n'),

      /* 9: ["Teee",[["{test}","{test}"]]] */
      self.tag(Teee, [[test, true]]),

      /* 0: "\n" */
      sf[2](tp[1]),

      /* 1: ["slot",[["name","SlotName"],["atr","12"],["{   ...test   }","{   ...test   }"]]] */
      sf[0](
        tp[2],
        [
          [tp[3], tp[4]],
          [tp[5], tp[0]],
          [sf[1](() => sf[3]({ ...test })), tp[6]]
        ],
        /* 2: "Text content {test}" */
        sf[2](sf[1](() => 'Text content ' + test))
      ),

      /* 0: "" */
      self.text('\n'),

      /* 1: ["slot",[["name","SlotName"],["atr","{test}"],["{   ...test   }",""]]] */
      self.tag(
        'slot',
        [
          ['name', 'SlotName'],
          ['atr', test],
          [self.store(() => self.spread({ ...test })), true]
        ],
        /* 2: "Text content {test}" */
        self.text(self.store(() => 'Text content ' + test))
      ),

      /* 0: "\n  " */
      self.text('\n  '),

      /* 1: ["slot",[["name","SlotName"],["atr","{test}"],["{   ...test }",""]]] */
      self.tag('slot', [
        ['name', 'SlotName'],
        ['atr', test],
        [self.store(() => self.spread({ ...test })), true]
      ]),

      /* 2: "\n" */
      self.text('\n')
    )

    /* "div[rikk7m4i1]{color: red;}" */
    self.style(() => 'divS{color: red;}'.replace(/S/g, self.cid(this.cid)))
  }
}
