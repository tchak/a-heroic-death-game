import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service game;

  model({ key }) {
    localStorage.setItem('PLAYER_KEY', key);
    localStorage.removeItem('HOST_KEY');

    return this.game.fetchHero();
  }
}
