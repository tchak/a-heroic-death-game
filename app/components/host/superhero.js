import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const TABS = ['Items', 'Bedroom', 'Abilities'];

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

  get hero() {
    return this.game.hero;
  }

  get items() {
    return this.hero.items;
  }

  get abilities() {
    return this.hero.abilities;
  }

  get room() {
    return this.hero.room;
  }

  get information() {
    return this.hero.information;
  }

  get secret() {
    return this.hero.secret;
  }

  get name() {
    return this.hero.name;
  }

  @action useItem(item) {
    this.game.useItem(item.key);
  }

  @action useAbility(ability) {
    this.game.useAbility(ability.key);
  }

  get publicURL() {
    return `https://a-heroic-death-game.netlify.app/superhero/${this.hero.key}`;
  }
}
