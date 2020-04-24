import Component from '@glimmer/component';
import { action } from '@ember/object';
import fetch from 'fetch';
import ENV from 'a-heroic-death-game/config/environment';

export default class extends Component {
  get key() {
    return localStorage.HOST_KEY;
  }

  @action async start() {
    await fetch(`${ENV.API_HOST}/games/${this.key}/start`, {
      method: 'POST',
    });
    location.reload();
  }

  @action async stop() {
    await fetch(`${ENV.API_HOST}/games/${this.key}/stop`, {
      method: 'POST',
    });
    location.reload();
  }

  @action refresh() {
    location.reload();
  }

  @action async reset() {
    await fetch(`${ENV.API_HOST}/games/${this.key}/reset`, {
      method: 'POST',
    });
    location.reload();
  }
}
