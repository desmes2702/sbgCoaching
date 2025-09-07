import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // ignore build & vendor
  { ignores: ['dist/**', 'node_modules/**'] },

  // bases JS + TS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Laisse TS gérer les unused vars
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
