import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked isCardOpen;

  @action openCard() {
    this.isCardOpen = true;
  }
  @action closeCard() {
    this.isCardOpen = false;
  }
}
