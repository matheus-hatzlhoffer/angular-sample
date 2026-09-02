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
      boundaries,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      boundaries.configs.strict,
    ],
    processor: angular.processInlineTemplates,
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      'boundaries/ignore': [],
      'boundaries/dependency-nodes': ['import', 'dynamic-import'],
      'boundaries/files': [
        {
          pattern: 'projects/**/src/main.ts',
          category: 'main',
          capture: ['app']
        },
        {
          pattern: 'projects/**/src/app/{app,app.config}.ts',
          category: 'app',
          capture: ['app']
        },
        {
          pattern: 'projects/**/src/app/app.routes.ts',
          category: 'app-routes',
          capture: ['app']
        },
        {
          pattern: 'projects/**/src/app/features/*/*.routes.ts',
          category: 'feature-routes',
          capture: ['app', 'feature']
        },
        {
          pattern: 'projects/**/src/public-api.ts',
          category: 'lib-api',
          capture: ['lib']
        }
      ],
      'boundaries/elements': [
        {
          type: 'env',
          pattern: 'environments',
          basePattern: 'projects/**/src',
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
          type: 'feature',
          pattern: 'features/*',
          capture: ['feature'],
          basePattern: 'projects/**/src/app',
          baseCapture: ['app'],
        },
        {
          type: 'lib',
          pattern: 'projects/**/src/lib',
          capture: ['lib'],
        },
      ],
      'boundaries/debug': {
        enabled: true,
        messages: {
          files: true,
          dependencies: true,
          violations: true,
        },
      },
      'boundaries/legacy-templates': false,
    },
    rules: {
      'boundaries/dependencies': [
        2,
        {
          default: 'disallow',
          policies: [
            {
              from: { file: { categories: 'main' } },
              allow: [
                { to: { file: { categories: 'app' } } },
                { to: { element: { type: 'env', captured: { app: '{{from.captured.app}}' } } } },
              ],
            },
            {
              from: { element: { type: 'core' } },
              allow: [
                { to: { file: { categories: 'lib-api' } } },
                { to: { element: { type: 'env', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'core', captured: { app: '{{from.captured.app}}' } } } },
              ],
            },
            {
              from: { element: { type: 'ui' } },
              allow: [
                { to: { file: { categories: 'lib-api' } } },
                { to: { element: { type: 'ui', captured: { app: '{{from.captured.app}}' } } } },
              ],
            },
            {
              from: { element: { type: 'layout' } },
              allow: [
                { to: { file: { categories: 'lib-api' } } },
                { to: { element: { type: 'env', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'core', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'ui', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'pattern', captured: { app: '{{from.captured.app}}' } } } },
              ],
            },
            {
              from: { file: { categories: 'app' } },
              allow: [
                { to: { file: { categories: 'lib-api' } } },
                { to: { element: { type: 'env', captured: { app: '{{from.captured.app}}' } } } },
                { to: { file: { categories: 'app', captured: { app: '{{from.captured.app}}' } } } },
                { to: { file: { categories: 'app-routes', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'core', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'layout', captured: { app: '{{from.captured.app}}' } } } },
                { to: { file: { categories: 'feature-routes', captured: { app: '{{from.captured.app}}' } } } },
              ],
            },
            {
              from: { element: { type: 'pattern' } },
              allow: [
                { to: { file: { categories: 'lib-api' } } },
                { to: { element: { type: 'env', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'core', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'ui', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'pattern', captured: { app: '{{from.captured.app}}' } } } },
              ],
            },
            {
              from: { element: { type: 'feature' } },
              allow: [
                { to: { file: { categories: 'lib-api' } } },
                { to: { element: { type: 'env', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'core', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'ui', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'pattern', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'feature', captured: { app: '{{from.captured.app}}', feature: '{{from.feature}}' } } } },
              ],
            },
            {
              from: { file: { categories: 'feature-routes' } },
              allow: [
                { to: { file: { categories: 'lib-api' } } },
                { to: { element: { type: 'env', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'core', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'pattern', captured: { app: '{{from.captured.app}}' } } } },
                { to: { element: { type: 'feature', captured: { app: '{{from.captured.app}}', feature: '{{from.feature}}' } } } },
                { to: { file: { categories: 'feature-routes', captured: { app: '{{from.captured.app}}', feature: '!{{from.feature}}' } } } },
              ],
            },
            {
              from: { file: { categories: 'lib-api' } },
              allow: [
                { to: { element: { type: 'lib', captured: { lib: '{{from.lib}}' } } } },
              ],
            },
            {
              from: { element: { type: 'lib' } },
              allow: [
                { to: { element: { type: 'lib', captured: { lib: '{{from.lib}}' } } } },
              ],
            },
          ],
        },
      ],
      // TODO - Fix boundaries rules
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
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    ignores: ['.angular/', 'dist/', 'node_modules/'],
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
]);