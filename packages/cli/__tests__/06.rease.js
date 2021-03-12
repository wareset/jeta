import { Rease as RS } from 'rease';

import Test from 'test.rease'

const tp0 = "\n", tp1 = "div", tp2 = "\n  ", tp3 = "span", tp4 = "Content";

export default class Rease06 extends RS {
	get cid() {
		return ["ridka1lh2",true];
	}

	init(self) {
		const sf0 = self.tag, sf1 = self.text;
		self.template(
			/* 0: "\n" */
			sf1(tp0),

			/* 1: ["div",[]] */
			sf0(tp1, [], 
				/* 2: "\n  " */
				sf1(tp2),

				/* 3: ["Test",[]] */
				sf0(Test, [], 
					/* 4: ["span",[]] */
					sf0(tp3, [], 
						/* 5: "Content" */
						sf1(tp4))),

				/* 6: ["{Test}",[]] */
				sf0(Test, [], 
					/* 7: ["span",[]] */
					sf0(tp3, [], 
						/* 8: "Content" */
						sf1(tp4))),

				/* 9: "\n" */
				sf1(tp0))
		);

		/* "div[ridka1lh2]{color: red;}div[ridka1lh2] span[ridka1lh2]{color: green;}" */
		self.style(() => "divS{color: red;}divS spanS{color: green;}".replace(/S/g, self.cid(this.cid)));
	}
}
