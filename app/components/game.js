import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const TABS = ['Characters', 'Items'];

export default class extends Component {
  @service game;

  get characters() {
    return this.game.characters;
  }

  get items() {
    return this.game.items;
  }

  get isStarted() {
    return this.game.started;
  }

  @tracked tab = 'Characters';

  get tabs() {
    return TABS.map((name) => ({
      name,
      selected: name === this.tab,
    }));
  }

  @action selectTab(name) {
    this.tab = name;
  }
}
