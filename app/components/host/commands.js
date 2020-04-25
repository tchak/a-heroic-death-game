import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service game;

  get isStarted() {
    return this.game.isStarted;
  }

  @action start() {
    this.game.startGame();
  }

  @action stop() {
    this.game.stopGame();
  }

  @action refresh() {
    this.game.fetchGame();
  }

  @action reset() {
    this.game.resetGame();
  }
}
