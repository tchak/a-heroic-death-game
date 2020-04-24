module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],

  extends: ['octane', 'ember-template-lint-plugin-prettier:recommended'],

  rules: {
    'no-bare-strings': true,
    prettier: true,

    'block-indentation': false,
    'linebreak-style': false,
    quotes: false,
    'self-closing-void-elements': false,
  },
};
