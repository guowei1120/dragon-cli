module.exports = {
	extends: [require.resolve('@umijs/fabric/dist/stylelint')],
	rules: {
		'block-no-empty': true,
		'block-opening-brace-newline-after': ['always'],
		'block-closing-brace-newline-before': ['always'],
	},
};
