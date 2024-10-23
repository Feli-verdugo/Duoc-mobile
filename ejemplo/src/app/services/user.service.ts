import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveUser(user: any) {
    await this._storage?.set('user', user);
  }

  async getUser() {
    return await this._storage?.get('user');
  }

  async removeUser() {
    await this._storage?.remove('user');
  }
}
