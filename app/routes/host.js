import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service game;

  model({ key }) {
    localStorage.setItem('HOST_KEY', key);
    localStorage.removeItem('PLAYER_KEY');

    return this.game.fetchGame();
  }
}
