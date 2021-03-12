import { Rease as RS0 } from 'rease';

import Teee from './02.rease'

const tp0 = 12, tp1 = "\n", tp2 = "slot", tp3 = "name", tp4 = "SlotName", tp5 = "atr", tp6 = "Text content ";

export default class Rease04 extends RS0 {
	get cid() {
		return ["rikk7m4i1",true];
	}

	init(self) {
const test = 'C0C1'

!function(){"use strict";const t=(t="",e=0,n=" ")=>(e-=t.length)>0?t+((t="",e=1)=>{let n="";for(e=-~e||0;e-- >0;)n+=t;return n})(n,e/n.length).slice(0,e):t,e="abcdefghijklmnopqrstuvwxyz",n="ABCDEFGHIJKLMNOPQRSTUVWXYZ";function s(e="",n=1,s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"){const l=Math.max(e.length,+n);if(!e.length)return t("",l,s[0]);const r=e.split("").reverse();for(const n of r){e=e.slice(0,e.length-1);const r=+s.indexOf(n);if(r<s.length-1)return e=t(String(e+s[r+1]),l,s[0])}return t("",l,s[0])+s[0]}s.numbers=function(t="",e=1,n="0123456789"){return s(t,e,n)},s.lowers=function(t="",n=1,l=e){return s(t,n,l)},s.uppers=function(t="",e=1,l=n){return s(t,e,l)};const l={fakeQuotes:!1,strict:!0},r=/^[-=+*&|?!%^<>/]+$/;const i=function(t="",e=l){e={...l,...e||{}};const n=((t="",e="\0%")=>{let n="";do{n=s.numbers(n)}while(!(e+n)||-1!==t.indexOf(e+n));return e+n})(t),i=t.replace(/(\\[^]|\/\*|\*\/|\/\/?|\r?\n|\s|\$\{|[-=+*&|?!%^<>]+|[^$\w])/g,(t,e)=>`${n}${e}${n}`).split(n);let h=i.length;for(;--h>=0;)i[h]?"*/"===i[h]?i.splice(h,1,"*","/"):/^\s+$/.test(i[h])&&i[h]===i[h+1]&&(i[h]+=i[h+1],i.splice(h+1,1)):i.splice(h,1);const o=[];let f,c,u,g,$,a=!1,w=0,O=0,E="";const T=[],N=[];let d,p,C={raw:""};const S=()=>f+=$=i.length?i.shift():"",K=()=>c=i.length?i[0]:"",R=(n,s="UNKNOWN")=>{if(e.strict&&!n.length)throw new Error(`rastree tokenize: ERROR_${s}:\n\nContent: [${t}]\n\nStart: ${u}\nRaw: ${f}\nTemp: ${g}\nRawTemp: ${$}\n\nData:\n`+JSON.stringify(o,null,2));return!!n.length};for(h=-1;i.length;)if(f=i.shift(),f.length){if(c=K(),++h,p=!1,d=!1,e.fakeQuotes&&w<2&&(!h||!i.length||N.length&&"}"===f&&!N[0]&&(N.shift(),1))){do{(g=/(?<![\\])\{$/.test(f))?N.unshift(0):S()}while(!g&&i.length);d=!0}else if("/*"===f)do{S()}while(!/\*\/$/.test(f)&&R(i,"BLOCK_COMMENT (/* ... */)"));else if("//"===f)do{S(),K()}while(!/\r?\n/.test(c)&&R(i,"LINE_COMMENT (// ...)"));else if("/"!==f||/[\]})\w.%'"`]\s*$/i.test(E))if(!(g=f)||"'"!==f&&'"'!==f)if("`"===f||T.length&&"}"===f&&!T[0]&&(T.shift(),1)){do{(g=/(?<![\\])\$\{$/.test(f))?T.unshift(0):S()}while(!g&&"`"!==$&&R(i,"BACKTICKS (`...`)"));p=!0}else r.test(f)&&r.test(C.raw)&&(f=C.raw+f,O=C.start,o.shift());else do{S()}while($!==g&&R(i,`QUOTES (${g}...${g})`));else{do{S(),K()}while("/"!==((a="["===(_=$)||"]"!==_&&a)||_)&&R(i,"REGEXP (/.../)"));/^\w+$/.test(c)&&(f+=i.shift())}f.trim().length&&!/^\/[*/]/.test(f)&&(E=f),!p&&T.length&&("{"===f?T[0]++:"}"===f&&T[0]--),!d&&N.length&&("{"===f?N[0]++:"}"===f&&N[0]--),/^[)}\]]/.test(f)&&--w,u=t.indexOf(f,O),O=u+f.length,o.push(C={deep:w,raw:f,start:u,end:O}),/[({[]$/.test(f)&&++w}var _;return w&&R([],"QUOTES_OR_BRACKETS"),T.length&&R([],"CONTENT_IN_BACKTICKS (`...${...}...)"),N[0]&&R([],"CONTENT_IN_FAKE_QUOTES (`...${...}...)"),o}("\n\n\n",{fakeQuotes:0});console.log(...i)}();
//# sourceMappingURL=bundle.js.map

		const sf0 = self.tag, sf1 = self.store, sf2 = self.text, sf3 = self.spread;
		self.template(
			/* 0: "\n" */
			self.text("\n"),

			/* 1: ["macro",[["name","list-item"]]] */
			self.tag("macro", [["name", "list-item"]], 
				/* 2: "\n  " */
				self.text("\n  "),

				/* 3: ["li",[]] */
				self.tag("li", [], 
					/* 4: "{this.itemkey}" */
					self.text(this.itemkey)),

				/* 5: "\n" */
				self.text("\n")),

			/* 6: "\n" */
			self.text("\n"),

			/* 7: ["list-item",[["itemkey","{123}"],["key","{test}"]]] */
			self.tag("list-item", [["itemkey", 123], ["key", test]]),

			/* 8: "\n" */
			self.text("\n"),

			/* 9: ["Teee",[["{test}","{test}"]]] */
			self.tag(Teee, [[test, true]]),

			/* 0: "\n" */
			sf2(tp1),

			/* 1: ["slot",[["name","SlotName"],["atr","12"],["{   ...test   }","{   ...test   }"]]] */
			sf0(tp2, [[tp3, tp4], [tp5, tp0], [sf1(() => sf3(test)), true]], 
				/* 2: "Text content {test ? `q${12} f` : 'asd'}" */
				sf2(sf1(() => tp6 + (test ? `q${12} f` : 'asd')))),

			/* 0: "" */
			self.text("\n"),

			/* 1: ["slot",[["name","SlotName"],["atr","{test}"],["{   ...test   }",""]]] */
			self.tag("slot", [["name", "SlotName"], ["atr", test], [self.store(() => self.spread(test)), true]], 
				/* 2: "Text content {test}" */
				self.text(self.store(() => "Text content " + test))),

			/* 0: "\n  " */
			self.text("\n  "),

			/* 1: ["slot",[["name","SlotName"],["atr","{test}"],["{   ...test }",""]]] */
			self.tag("slot", [["name", "SlotName"], ["atr", test], [self.store(() => self.spread(test)), true]]),

			/* 2: "\n" */
			self.text("\n")
		);

		/* "div[rikk7m4i1]{color: red;}" */
		self.style(() => "divS{color: red;}".replace(/S/g, self.cid(this.cid)));
	}
}
