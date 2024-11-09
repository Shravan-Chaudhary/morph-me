// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*)\))?\: (?:\s*(?::\w*:\s*)?)(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'scope-enum': [2, 'always', ['client', 'server', 'shared']],
    'scope-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'subject-case': [
      2,
      'never',
      [
        'lower-case',
        'sentence-case',
        'start-case',
        'pascal-case',
        'snake-case',
        'kebab-case',
      ],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0],
    'subject-min-length': [2, 'always', 1],
    'subject-exclamation-mark': [2, 'never'],
    'subject-custom': [
      2,
      'always',
      {
        pattern: /^(?::\w+:\s*)?[A-Z]/, // Allows optional emoji followed by capital letter
        errorMessage:
          'The first letter of the message (after any emoji) must be uppercase',
      },
    ],
  },
}
