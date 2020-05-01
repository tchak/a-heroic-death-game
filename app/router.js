import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('test');
  this.route('host', { path: '/host/:key' }, function () {
    this.route('superhero', { path: '/superhero/:hero_key' });
  });
  this.route('superhero', { path: '/superhero/:key' });
  this.route('404', { path: '/*path' });
});
