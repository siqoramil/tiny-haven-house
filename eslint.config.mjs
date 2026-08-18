import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts']),
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      '@next/next/no-img-element': 'off',

      // The theme and favorites providers intentionally read localStorage in a
      // mount effect: the value does not exist during SSR, so reading it any
      // earlier would desync hydration. Kept as a warning rather than an error
      // (rule is new in eslint-plugin-react-hooks v7).
      'react-hooks/set-state-in-effect': 'warn',

      // Conventional escape hatch for values that exist only to be discarded,
      // e.g. `const { description: _description, ...rest } = house`.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],

      // Feature-Sliced Design: a layer may only import from layers below it.
      //   app > views > widgets > features > entities > shared
      // Each zone lists the layers a target is NOT allowed to reach up into.
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/shared',
              from: ['./src/entities', './src/features', './src/widgets', './src/views', './src/app'],
              message: 'shared is the bottom layer — it must not import from any layer above it.',
            },
            {
              target: './src/entities',
              from: ['./src/features', './src/widgets', './src/views', './src/app'],
              message: 'entities may only import from shared.',
            },
            {
              target: './src/features',
              from: ['./src/widgets', './src/views', './src/app'],
              message: 'features may only import from entities and shared.',
            },
            {
              target: './src/widgets',
              from: ['./src/views', './src/app'],
              message: 'widgets may only import from features, entities and shared.',
            },
            {
              target: './src/views',
              from: ['./src/app'],
              message: 'views must not import from the app layer.',
            },
          ],
        },
      ],
    },
  },
])
