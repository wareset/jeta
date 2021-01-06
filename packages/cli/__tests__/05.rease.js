import { Rease as R0 } from 'rease'

import Test from 'test.rease'

export default class Rease05 extends R0 {
  get cid() {
    return '[ri2k5d987]'
  }

  init() {
    this.template(
      /* 0: "\n" */
      this.new.text('\n'),

      /* 1: ["test",[]] */
      this.new(
        'test',
        [],
        /* 2: "Content" */
        this.new.text('Content')
      ),

      /* 3: "\n" */
      this.new.text('\n'),

      /* 4: ["Test",[]] */
      this.new(
        this.store().run(() => Test),
        [],
        /* 5: "Content" */
        this.new.text('Content')
      ),

      /* 6: ["test",[]] */
      this.new(
        'test',
        [],
        /* 7: "Content" */
        this.new.text('Content')
      ),

      /* 8: ["Test",[]] */
      this.new(
        this.store().run(() => Test),
        [],
        /* 9: "Content" */
        this.new.text('Content')
      ),

      /* 10: "\n" */
      this.new.text('\n'),

      /* 11: " +tag(\"{test}\")() Content" */
      this.new.comment(
        this.store().run(() => ' +tag("' + test + '")() Content')
      ),

      /* 12: ["{Test}",[]] */
      this.new(
        this.store().run(() => Test),
        [],
        /* 13: "Content" */
        this.new.text('Content')
      )
    )
  }
}
