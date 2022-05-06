module.exports = {
	env: {
		browser: true,
		es2021: true,
		'vue/setup-compiler-macros': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error':'off' ,
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error':'off' ,
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',

		'vue/script-setup-uses-vars': 'error', //因为不能检测vue SFC pug
		'@typescript-eslint/no-unused-vars': 'off', //所以关闭,由tsConfig 处理unused vars

		//有的props只是单纯的数据展示并不需要响应性，动态组件中重命名props有利于理解
		'vue/no-setup-props-destructure': ['warn'],
		'@typescript-eslint/no-explicit-any': [
			'warn',
			{
				ignoreRestArgs: true,
			},
		],
	},
}
