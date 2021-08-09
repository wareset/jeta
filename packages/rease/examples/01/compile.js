import { Rease } from 'rease'
import { styleFactory, mixinFactory } from 'rease/core'
import { onCreate, onMount, onChange, onDestroy } from 'rease/hooks'
import { storeFactory, subscribeFactory } from 'rease/store'

import { RuleIf, RuleElseIf, RuleElse, RuleForOf } from 'rease/rules'

import { storeDefault } from 'rease/store'

const $divColor = storeDefault('red')

const style = (_n, _$) => [
  [['div.testclass'], _n('color'), _$($divColor)],
  [['div.testclass', 'span'], _n('color'), 'green']
]

export default class R01 extends Rease {
  constructor(...a1) {
    super(...a1)
    const component = this

    const store = storeFactory(component)
    const subscribe = subscribeFactory(component)

    const $test = store('text')
    const $count = store(1)

    onCreate(component, () => {
      const intId = setInterval(() => {
        $count.$++
      }, 1000)

      return () => {
        clearInterval(intId)
      }
    })

    styleFactory(component, style)

    mixinFactory(
      component,
      [
        ['name', 'list-item'],
        ['prop1', '0'],
        ['prop2', '1', 'qwe']
      ],
      (prop1, prop2) => [['li', null, () => prop1.$]]
    )

    // templateFactory(
    //   component,
    //   [
    //     'ul',
    //     null,
    //     [
    //       'list-item',
    //       [
    //         ['prop1', 'q1'],
    //         ['prop2', 'qwe']
    //       ]
    //     ],
    //     ['list-item', [['prop1', 'q2']]],
    //     ['list-item', [['prop1', 'q3']]]
    //   ],

    //   [() => 'div', null, 'divContent'],

    //   ['comment', null, 'CommentExample'],

    //   ['h1', [], 'Header'],

    //   [
    //     'div',
    //     [['class', () => 'testclass ' + $test.$]],
    //     'DIV ELEMENT ',
    //     () => $test.$,
    //     ' ',
    //     () => $count.$,
    //     '\n    ',
    //     ['span', null, 'SPAN ELEMENT ', () => 'text'],
    //     '\n    ',
    //     ['slot']
    //   ],

    //   [SampleComponent, null, 'text'],
    //   // [R01, null, 'text'],

    //   ['rule', [['if', () => $count.$ < 10]], 'count < 10'],
    //   ['rule', [['else-if', () => $count.$ <= 20]], 'COUNT 10...20'],
    //   ['rule', [['else']], 'count > 20', ['slot', [['name', 'slot2']]]],

    //   [
    //     'rule',
    //     [
    //       ['for-of', [1, 2, 3]],
    //       [':value', 'item']
    //     ],
    //     () => item
    //   ]
    // )

    return ($) => [
      [
        'mixin',
        [
          ['name', 'list-item'],
          ['vars', 'prop1', 'prop2']
        ],
        (prop1 = 42, prop2 = 'asd') => [
          ['li', null, () => [$([prop1], () => prop1.$)]]
        ]
      ],
      [
        'ul',
        null,
        () => [
          [
            'list-item',
            [
              ['prop1', 'q1'],
              ['prop2', 'qwe']
            ]
          ],
          ['list-item', [['prop1', 'q2']]],
          ['list-item', [['prop1', 'q3']]]
        ]
      ],

      [() => 'div', null, () => ['divContent']],

      ['comment', null, () => ['CommentExample']],

      ['h1', [], () => ['Header']],

      [
        'div',
        [['class', () => 'testclass ' + $test.$]],
        () => [
          'DIV ELEMENT ',
          () => $test.$,
          ' ',
          () => $count.$,
          '\n    ',
          ['span', null, 'SPAN ELEMENT ', () => 'text'],
          '\n    ',
          ['slot']
        ]
      ],

      [SampleComponent, null, () => ['text']],
      // [R01, null, 'text'],

      [RuleIf, [['data', () => $count.$ < 10]], () => ['count < 10']],
      [RuleElseIf, [['data', () => $count.$ <= 20]], () => ['COUNT 10...20']],
      [RuleElse, null, 'count > 20', () => [['slot', [['name', 'slot2']]]]],

      [
        RuleForOf,
        [
          ['data', [1, 2, 3]],
          ['vars', 'item']
        ],
        (item) => [item]
      ]
    ]
  }
}
