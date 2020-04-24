'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      './app/index.html',
      './app/templates/**/*.hbs',
      './app/components/**/*.hbs',
      './app/components/**/*.js',
    ],
    defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
  },
};

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-service-worker': {
      registrationStrategy: 'async',
      versionStrategy: 'every-build',
    },

    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./config/tailwind.config.js'),
          ...(isProduction ? [purgeCSS] : []),
        ],
      },
    },

    newVersion: {
      enabled: true,
      useAppVersion: true,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
