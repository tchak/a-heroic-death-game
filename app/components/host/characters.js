import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service game;

  get isStarted() {
    return this.game.isStarted;
  }

  @action knockout(id) {
    this.game.knockoutHero(id);
  }

  @action kill(id) {
    this.game.killHero(id);
  }

  @action bringback(id) {
    this.game.bringbackHero(id);
  }
}
