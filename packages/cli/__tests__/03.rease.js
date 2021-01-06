import { Rease as R0 } from 'rease'

export default class Rease03 extends R0 {
  get cid() {
    return '[ri9k3af96]'
  }

  init() {
    const test = 'ATR'

    this.template(
      /* 0: "\n" */
      this.new.text('\n'),

      /* 1: ["slot",[["name","SlotName"],["atr","{test}"]]] */
      this.new('slot', [
        ['name', 'SlotName'],
        ['atr', this.store().run(() => test)]
      ])
    )
  }
}
