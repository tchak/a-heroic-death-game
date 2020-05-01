import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service game;

  model({ hero_key: key }) {
    this.game.heroKey = key;
  }
}
