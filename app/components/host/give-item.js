import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service game;

  @tracked where = 'items';
  @tracked whom;

  get what() {
    return this.args.item.key;
  }

  get hostOwned() {
    return this.args.item.host_owned;
  }

  get params() {
    return {
      item: this.what,
      from: {
        where: this.whereIs(this.what),
        whom: this.character.key,
      },
      to: {
        where: this.where,
        whom: this.whom,
      },
    };
  }

  whereIs(key) {
    if (this.hostOwned) {
      return 'items';
    } else if (this.character.room.find((item) => item.key === key)) {
      return 'room';
    } else {
      return 'items';
    }
  }

  get isStarted() {
    return this.game.isStarted;
  }

  get character() {
    if (this.hostOwned) {
      return { key: 'host' };
    }
    return this.game.hero;
  }

  get characters() {
    return this.game.characters.filter(
      (character) => character !== this.character
    );
  }

  get places() {
    return [
      {
        name: 'Give to',
        key: 'items',
      },
      {
        name: 'Put in the room of',
        key: 'room',
      },
    ];
  }

  @action selectWhere(evt) {
    this.where = evt.target.selectedOptions[0].value;
  }

  @action selectWhat(evt) {
    this.what = evt.target.selectedOptions[0].value;
  }

  @action selectWhom(evt) {
    this.whom = evt.target.selectedOptions[0].value;
  }

  @action giveItem() {
    const { item, from, to } = this.params;

    this.game.moveItem(item, from, to);
  }
}
