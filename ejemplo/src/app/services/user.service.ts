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

    // Esto inicia la base de datos

    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Este sirve para guardar los datos ingresados

  async saveUser(user: any) {
    await this._storage?.set('user', user);
  }

  // Este sirve para obtener los datos ingresados

  async getUser() {
    return await this._storage?.get('user');
  }

  // Este ultimo esta para borrar los datos

  async removeUser() {
    await this._storage?.remove('user');
  }
}
