import { ReaseComponent as ReaseComponent$0 } from "rease";
import { store } from "rease";


export default class Test1
  extends ReaseComponent$0 {
  __() {
const q = store(this)(12)
const click = (e) => {
  console.log(e)
}

const click2 = (e) => {
  console.log(e)
}

const $node = store()

    return (_$$0, _tg$0, _tx$0) => [
      _tx$0([" comment"], 1),
      _tx$0(["\n"]),
      _tg$0("div", [["class", "qwe"], [":ref", $node, "header"]], (_$$0, arg1 = 555) => [
        _tx$0(["\n  "]),
        _tg$0(_$$0(() => (q || 'h1')), 0, (_$$0) => [
          _tx$0(["Header"])
        ]),
        _tg$0("span", [[":use", [click2, [q]], ""]], (_$$0) => [
          _tx$0(["sometext ", _$$0([q], () => q), " ", arg1])
        ]),
        _tx$0(["\n  "]),
        _tg$0("button", [[":on", ["click.once", [click,click2]], "qwe"], [":on", ["dblclick", [click, click2]], "head"], [":on", [['click2', click, click2], ['click3', click]], "1"]], (_$$0) => [
          _tx$0(["< click me! ", {}, " zxc ", _$$0(() => {})])
        ]),
        _tx$0(["\n"])
      ])
    ];

  }
}
