import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'a-heroic-death-game/config/environment';

export default class extends Route {
  async model({ id }) {
    return fetch(`${ENV.API_HOST}/characters/${id}`).then((response) =>
      response.json()
    );
  }
}
