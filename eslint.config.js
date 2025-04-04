const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nxEslintPlugin = require('@nx/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');
const stylisticEslintPluginJs = require('@stylistic/eslint-plugin-js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    plugins: {
      '@nx': nxEslintPlugin,
      import: eslintPluginImport,
      '@stylistic/js': stylisticEslintPluginJs,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      camelcase: 'error',
      curly: 'error',
      'dot-notation': 'error',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-useless-concat': 'error',
      'prefer-template': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-shadow': 'error',
      'import/newline-after-import': 'off',
      'import/no-amd': 'off',
      'import/no-self-import': 'error',
      'import/first': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['parent', 'sibling', 'index'],
          ],
        },
      ],
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...config.rules,
      '@typescript-eslint/no-inferrable-types': 'off',
      '@stylistic/js/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    rules: {
      ...config.rules,
      '@stylistic/js/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  })),
  ...compat.config({ env: { jest: true } }).map((config) => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...config.rules,
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['webpack.config.js'],
    rules: {
      ...config.rules,
      '@typescript-eslint/no-require-imports': 'off',
    },
  })),
  {
    ignores: ['node_modules/*'],
  },
];
