module.exports = {
	extends: 'eslint:recommended',
	env: {
		node: true,
		es6: true,
		browser: true
	},
	globals: {
		// false 变量不应被重写（只读）
		jQuery: false,
		$: false
	},
	rules: {
		'no-console': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-unused-vars': 'off',
		'no-var': 'error'
	}
}