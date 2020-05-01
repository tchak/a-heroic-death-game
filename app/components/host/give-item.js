import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service game;

  @tracked where = 'items';
  @tracked what;
  @tracked whom;

  get params() {
    return {
      item: this.what,
      from: {
        where: this.what ? this.whereIs(this.what) : undefined,
        whom: this.character.key,
      },
      to: {
        where: this.where,
        whom: this.whom,
      },
    };
  }

  whereIs(key) {
    if (this.character.room.find((item) => item.key === key)) {
      return 'room';
    } else {
      return 'items';
    }
  }

  get isStarted() {
    return this.game.isStarted;
  }

  get character() {
    return this.args.character;
  }

  get characters() {
    return this.game.characters.filter(
      (character) => character !== this.args.character
    );
  }

  get places() {
    return [
      {
        name: 'give',
        key: 'items',
      },
      {
        name: 'put in the room',
        key: 'room',
      },
    ];
  }

  get items() {
    return this.character.items.concat(
      this.character.room.map((item) =>
        Object.assign({}, item, { inRoom: true })
      )
    );
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
