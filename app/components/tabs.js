import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @action selectOption(onChange, evt) {
    onChange(evt.target.selectedOptions[0].value);
  }
  @action noop() {}
}
