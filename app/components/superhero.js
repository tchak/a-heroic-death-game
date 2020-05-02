import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const TABS = ['Items', 'Bedroom', 'Abilities', 'Information', 'Secret'];

export default class extends Component {
  @service game;
  @tracked tab = 'Items';

  get tabs() {
    return TABS.map((name) => ({
      name,
      selected: name === this.tab,
    }));
  }

  @action selectTab(name) {
    this.tab = name;
  }

  get isStarted() {
    return this.game.isStarted;
  }

  get isDead() {
    return this.game.isDead;
  }

  get isUnconscious() {
    return this.game.isUnconscious;
  }

  get items() {
    return this.game.items;
  }

  get abilities() {
    return this.game.abilities;
  }

  get room() {
    return this.game.room;
  }

  get information() {
    return this.game.hero.information;
  }

  get secret() {
    return this.game.hero.secret;
  }

  get name() {
    return this.game.hero.name;
  }

  get profile() {
    return this.game.hero.profile;
  }

  get disabledAt() {
    return this.game.hero.disabled_at;
  }

  get contingency() {
    if (this.game.hero.contingency_instructions) {
      return {
        instructions: this.game.hero.contingency_instructions,
        contents: this.game.hero.contingency_contents,
      };
    }
    return false;
  }
}
