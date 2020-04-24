import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'a-heroic-death-game/config/environment';

export default class extends Route {
  model({ key }) {
    return fetch(`${ENV.API_HOST}/games/${key}`).then((response) => {
      if (response.ok) {
        localStorage.HOST_KEY = key;
        return response.json();
      }
      return false;
    });
  }
}
