import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const TABS = ['Items', 'Room', 'Abilities', 'Information', 'Secret'];

export default class extends Component {
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
}
