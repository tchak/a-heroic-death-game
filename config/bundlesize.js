'use strict';

module.exports = {
  app: {
    javascript: {
      pattern: ['assets/vendor-*.js', 'assets/a-heroic-death-game-*.js'],
      limit: '200KB',
      compression: 'gzip',
    },
    'javascript [brotli]': {
      pattern: ['assets/vendor-*.js', 'assets/a-heroic-death-game-*.js'],
      limit: '180KB',
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
