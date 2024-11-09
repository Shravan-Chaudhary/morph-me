// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|docs|style|refactor|test|chore)\((client|server|shared)\):\s+(?::\w+:\s*)?(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    // Requiring specific type
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lowerCase'],

    // Requiring scope and limiting to specific values
    'scope-enum': [2, 'always', ['client', 'server', 'shared']],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lowerCase'],

    // Subject formatting
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', ['sentence-case']],
    'subject-full-stop': [0],
    'header-max-length': [2, 'always', 100],
  },
}
