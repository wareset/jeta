import { Rease as R0 } from 'rease'

export default class Rease02 extends R0 {
  get cid() {
    return '[rgfjf1i4m]'
  }

  init() {
    const test = 'ATR'

    this.template(
      /* 0: "\n  " */
      this.new.text('\n  '),

      /* 1: ["slot",[["name","SlotName"],["atr","{test}"]]] */
      this.new('slot', [
        ['name', 'SlotName'],
        ['atr', this.store().run(() => test)]
      ]),

      /* 2: "\n" */
      this.new.text('\n')
    )
  }
}
