import Service from '@ember/service';
import fetch from 'fetch';
import ENV from 'a-heroic-death-game/config/environment';
import swr from 'ember-swr';
import { tracked } from '@glimmer/tracking';
import interval from 'human-interval';

export default class extends Service {
  @tracked _api;
  @tracked heroKey;

  get api() {
    if (!this._api) {
      if (this.isPlayer) {
        this._api = swr(`${ENV.API_HOST}/characters/${this.playerKey}`, {
          refreshInterval: interval('1 minute'),
        });
      } else {
        this._api = swr(`${ENV.API_HOST}/games/${this.hostKey}`, {
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        });
      }
    }
    return this._api;
  }

  get game() {
    return this._api.data;
  }

  get hero() {
    if (this.isHost) {
      return this.characters.find(
        (character) => character.key === this.heroKey
      );
    }
    return this._api.data;
  }

  get hostKey() {
    return localStorage.getItem('HOST_KEY');
  }

  get playerKey() {
    return localStorage.getItem('PLAYER_KEY');
  }

  get isHost() {
    return !!this.hostKey;
  }

  get isPlayer() {
    return !!this.playerKey;
  }

  get isLoaded() {
    return !this.api.isLoading;
  }

  get isUnlocked() {
    return localStorage.getItem('UNLOCKED');
  }
  get isStarted() {
    if (this.isPlayer) {
      return !!this.hero.game.started || this.isUnlocked;
    }
    return !!this.game.started_at;
  }

  get characters() {
    return this.game.characters;
  }

  get items() {
    if (this.isPlayer) {
      return this.hero.items;
    }
    return this.game.items;
  }

  get room() {
    return this.hero.room;
  }

  get abilities() {
    return this.hero.abilities;
  }

  get isDead() {
    return this.hero.dead;
  }

  get isUnconscious() {
    return !!this.hero.disabled_at;
  }

  async fetchHero() {
    if (!this.isPlayer) {
      return false;
    }

    const ok = await this.api.revalidate();

    if (!ok) {
      localStorage.removeItem('PLAYER_KEY');
    }
  }

  async fetchGame() {
    if (!this.isHost) {
      return false;
    }

    const ok = await this.api.revalidate();

    if (!ok) {
      localStorage.removeItem('HOST_KEY');
    }
  }

  async startGame() {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/start`,
      {
        method: 'POST',
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }

  async stopGame() {
    const response = await fetch(`${ENV.API_HOST}/games/${this.hostKey}/stop`, {
      method: 'POST',
    });

    if (response.ok) {
      this.fetchGame();
    }
  }

  async resetGame() {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/reset`,
      {
        method: 'POST',
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }

  async knockoutHero(id) {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/characters/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'knockout',
        }),
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }

  async killHero(id) {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/characters/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'kill',
        }),
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }

  async bringbackHero(id) {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/characters/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'bringback',
        }),
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }

  async moveItem(id, from, to) {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/items/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'move',
          from,
          to,
        }),
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }

  async useItem(id) {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/items/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'use',
        }),
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }

  async useAbility(id) {
    const response = await fetch(
      `${ENV.API_HOST}/games/${this.hostKey}/abilities/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'use',
        }),
      }
    );

    if (response.ok) {
      this.fetchGame();
    }
  }
}
