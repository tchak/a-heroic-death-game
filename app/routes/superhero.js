import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service game;

  model({ key }) {
    localStorage.setItem('PLAYER_KEY', key);
    localStorage.removeItem('HOST_KEY');

    if (this.queryParams.has('unlock')) {
      localStorage.setItem('UNLOCKED', true);
    }

    return this.game.fetchHero();
  }

  get queryParams() {
    return new URLSearchParams(location.search);
  }
}
