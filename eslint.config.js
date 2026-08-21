// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const boundaries = require('eslint-plugin-boundaries');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    plugins: {
      boundaries
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      boundaries.configs.strict
    ],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        }
      },
      'boundaries/ignore': [],
      'boundaries/dependency-nodes': ['import', 'dynamic-import'],
      'boundaries/elements': [
        {
          type: 'env',
          pattern: 'environments',
          basePattern: 'projects/**/src',
          baseCapture: ['app'],
        },
        {
          type: 'main',
          mode: 'file',
          pattern: 'main.ts',
          basePattern: 'projects/**/src',
          baseCapture: ['app'],
        },
        {
          type: 'app',
          mode: 'file',
          pattern: 'app(-|.)*.ts',
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },
        {
          type: 'core',
          pattern: 'core',
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },
        {
          type: 'ui',
          pattern: 'ui',
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },
        {
          type: 'layout',
          pattern: 'layout',
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },
        {
          type: 'pattern',
          pattern: 'pattern',
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },
        {
          type: 'feature-routes',
          mode: 'file',
          pattern: 'features/*/*.routes.ts',
          capture: ['feature'],
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },
        {
          type: 'feature',
          pattern: 'features/*',
          capture: ['feature'],
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },

        {
          type: 'lib-api',
          mode: 'file',
          pattern: 'projects/**/src/public-api.ts',
          capture: ['lib'],
        },
        {
          type: 'lib',
          pattern: 'projects/**/src/lib',
          capture: ['lib'],
        },
      ],
    },
    processor: angular.processInlineTemplates,
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: {
                element: {
                  type: "core"
                }
              },
              allow: [['app', { app: '${from.app}' }]],
            },
            {
              from: 'core',
              allow: [
                ['lib-api'],
                ['env', { app: '${from.app}' }],
                ['core', { app: '${from.app}' }],
              ],
            },
            {
              from: 'ui',
              allow: [
                ['lib-api'],
                ['env', { app: '${from.app}' }],
                ['ui', { app: '${from.app}' }],
              ],
            },
            {
              from: 'layout',
              allow: [
                ['lib-api'],
                ['env', { app: '${from.app}' }],
                ['core', { app: '${from.app}' }],
                ['ui', { app: '${from.app}' }],
                ['pattern', { app: '${from.app}' }],
                ['layout', { app: '${from.app}' }],
              ],
            },
            {
              from: 'app',
              allow: [
                ['lib-api'],
                ['env', { app: '${from.app}' }],
                ['app', { app: '${from.app}' }],
                ['core', { app: '${from.app}' }],
                ['layout', { app: '${from.app}' }],
                ['feature-routes', { app: '${from.app}' }],
              ],
            },
            {
              from: ['pattern'],
              allow: [
                ['lib-api'],
                ['env', { app: '${from.app}' }],
                ['core', { app: '${from.app}' }],
                ['ui', { app: '${from.app}' }],
                ['pattern', { app: '${from.app}' }],
              ],
            },
            {
              from: ['feature'],
              allow: [
                ['lib-api'],
                ['env', { app: '${from.app}' }],
                ['core', { app: '${from.app}' }],
                ['ui', { app: '${from.app}' }],
                ['pattern', { app: '${from.app}' }],
                ['feature', { app: '${from.app}', feature: '${from.feature}' }],
                ['layout', { app: '${from.app}' }],
              ],
            },
            {
              from: ['feature-routes'],
              allow: [
                ['lib-api'],
                ['env', { app: '${from.app}' }],
                ['core', { app: '${from.app}' }],
                ['pattern', { app: '${from.app}' }],
                ['feature', { app: '${from.app}', feature: '${from.feature}' }],
                [
                  'feature-routes',
                  { app: '${from.app}', feature: '!${from.feature}' },
                ],
              ],
            },
            {
              from: ['lib-api'],
              allow: [['lib', { app: '${from.lib}' }]],
            },
            {
              from: ['lib'],
              allow: [['lib', { app: '${from.lib}' }]],
            },
          ],
        },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'angle-bracket',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'sample',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sample',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
  {
    ignores: ['.angular/', 'dist/', 'node_modules/'],
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
]);
