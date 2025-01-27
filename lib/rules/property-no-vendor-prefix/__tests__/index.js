'use strict';

const { messages, ruleName } = require('..');

testRule({
	ruleName,
	config: [true],
	fix: true,

	accept: [
		{
			code: ':root { --foo-bar: 1px; }',
		},
		{
			code: 'a { color: pink; --webkit-transform: 1px; }',
		},
		{
			code: 'a { transform: scale(1); }',
		},
		{
			code: 'a { box-sizing: border-box; }',
		},
		{
			code: 'a { -webkit-font-smoothing: antialiased; }',
			description: 'non-standard prefixed property',
		},
		{
			code: 'a { -webkit-touch-callout: none; }',
			description: 'another non-standard prefixed property',
		},
		{
			code: 'a { -wEbKiT-tOuCh-CaLlOuT: none; }',
			description: 'another non-standard prefixed property',
		},
		{
			code: 'a { -WEBKIT-TOUCH-CALLOUT: none; }',
			description: 'another non-standard prefixed property',
		},
	],

	reject: [
		{
			code: 'a { -webkit-transform: scale(1); }',
			fixed: 'a { transform: scale(1); }',
			message: messages.rejected('-webkit-transform'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 22,
		},
		{
			code: 'a { -wEbKiT-tRaNsFoRm: scale(1); }',
			fixed: 'a { tRaNsFoRm: scale(1); }',
			message: messages.rejected('-wEbKiT-tRaNsFoRm'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 22,
		},
		{
			code: 'a { -WEBKIT-TRANSFORM: scale(1); }',
			fixed: 'a { TRANSFORM: scale(1); }',
			message: messages.rejected('-WEBKIT-TRANSFORM'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 22,
		},
		{
			code: 'a { -webkit-transform: scale(1); transform: scale(1); }',
			fixed: 'a { transform: scale(1); transform: scale(1); }',
			message: messages.rejected('-webkit-transform'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 22,
		},
		{
			code: 'a { transform: scale(1); -webkit-transform: scale(1); }',
			fixed: 'a { transform: scale(1); transform: scale(1); }',
			message: messages.rejected('-webkit-transform'),
			line: 1,
			column: 26,
			endLine: 1,
			endColumn: 43,
		},
		{
			code: 'a { -moz-transition: all 3s; }',
			fixed: 'a { transition: all 3s; }',
			message: messages.rejected('-moz-transition'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 20,
		},
		{
			code: 'a { -moz-columns: 2; }',
			fixed: 'a { columns: 2; }',
			message: messages.rejected('-moz-columns'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 17,
		},
		{
			code: 'a { -o-columns: 2; }',
			fixed: 'a { columns: 2; }',
			description: 'mistaken prefix',
			message: messages.rejected('-o-columns'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 15,
		},
		{
			code: 'a { -ms-interpolation-mode: nearest-neighbor; }',
			fixed: 'a { interpolation-mode: nearest-neighbor; }',
			description: '"hack" prefix',
			message: messages.rejected('-ms-interpolation-mode'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 27,
		},
	],
});

testRule({
	ruleName,
	config: [true, { ignoreProperties: ['transform', 'columns', '/^animation-/i'] }],
	fix: true,

	accept: [
		{
			code: 'a { -webkit-transform: scale(1); }',
		},
		{
			code: 'a { -moz-columns: 2; }',
		},
		{
			code: 'a { -webkit-animation-delay: 0.5s; }',
		},
		{
			code: 'a { -webkit-ANIMATION-DeLaY: 0.5s; }',
		},
		{
			code: 'a { width: 320px; }',
		},
	],
	reject: [
		{
			code: 'a { -webkit-border-radius: 10px; }',
			fixed: 'a { border-radius: 10px; }',
			message: messages.rejected('-webkit-border-radius'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 26,
		},
		{
			code: 'a { -moz-background-size: cover; }',
			fixed: 'a { background-size: cover; }',
			message: messages.rejected('-moz-background-size'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 25,
		},
		{
			code: 'a { -WEBKIT-tranSFoRM: translateY(-50%); }',
			fixed: 'a { tranSFoRM: translateY(-50%); }',
			message: messages.rejected('-WEBKIT-tranSFoRM'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 22,
		},
	],
});

testRule({
	ruleName,
	config: [true, { ignoreProperties: [/^animation-/i] }],
	fix: true,

	accept: [
		{
			code: 'a { -webkit-animation-delay: 0.5s; }',
		},
	],
	reject: [
		{
			code: 'a { -webkit-border-radius: 10px; }',
			fixed: 'a { border-radius: 10px; }',
			message: messages.rejected('-webkit-border-radius'),
			line: 1,
			column: 5,
			endLine: 1,
			endColumn: 26,
		},
	],
});
