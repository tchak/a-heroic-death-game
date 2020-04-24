'use strict';

module.exports = {
  app: {
    javascript: {
      pattern: ['assets/vendor-*.js', 'assets/ember-octane-template-*.js'],
      limit: '200KB',
      compression: 'gzip',
    },
    'javascript [brotli]': {
      pattern: ['assets/vendor-*.js', 'assets/ember-octane-template-*.js'],
      limit: '150KB',
      compression: 'brotli',
    },
    css: {
      pattern: 'assets/*.css',
      limit: '10KB',
      compression: 'gzip',
    },
    'css [brotli]': {
      pattern: 'assets/*.css',
      limit: '7KB',
      compression: 'brotli',
    },
  },
};
