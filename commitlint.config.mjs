export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "scope-empty": [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        'shell',
        'portfolio',
        'market',
        'analytics',
        'ui',
        'tokens',
        'state',
        'api-client',
        'utils',
        'deps',
        'config',
        'ci',
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'body-max-line-length': [2, 'always', 100],
  }
}