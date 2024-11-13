import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config({
	extends: [js.configs.recommended, ...tseslint.configs.recommended],
	files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	ignores: ['dist', 'node_modules', 'build', 'coverage'],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: {
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh,
		prettier,
	},

	rules: {
		...reactHooks.configs.recommended.rules,
		'dot-notation': 'error',
		'no-caller': 'error',
		'no-constant-condition': ['error', { checkLoops: false }],
		'no-eval': 'error',
		'no-extra-bind': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-return-await': 'error',
		'no-template-curly-in-string': 'error',
		'no-throw-literal': 'error',
		'no-undef-init': 'error',
		'no-var': 'error',
		'object-shorthand': 'error',
		'prefer-const': 'error',
		'prefer-object-spread': 'error',
		'unicode-bom': ['error', 'never'],
		'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
		'react/react-in-jsx-scope': 'off', // Not needed with React 17+
		'prettier/prettier': [
			'error',
			{
				tabWidth: 2,
				useTabs: false,
			},
		],
	},
});
