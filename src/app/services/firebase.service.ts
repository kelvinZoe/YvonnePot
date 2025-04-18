import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  Database,
  set,
  ref,
  update,
  get,
  getDatabase,
  push,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private Auth = inject(Auth);
  constructor(private db: Database) {}
  //fetch data from firebase
  async signUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.Auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.Auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      throw error;
    }
  }
  async signOut() {
    try {
      await signOut(this.Auth);
    } catch (error) {
      throw error;
    }
  }

  async addItem(message: { name: string; message: string }) {
    try {
      let messafeRef: any;
      messafeRef = ref(this.db, 'items/');
      await push(messafeRef, message);
      return messafeRef;
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id: string, message: { name: string; message: string }) {
    try {
      const itemRef = ref(this.db, 'items/' + id);
      await update(itemRef, message);
    } catch (error) {
      throw error;
    }
  }
  async getItems() {
    try {
      const user = this.Auth.currentUser; // Check if the user is authenticated
      if (!user) {
        throw new Error('User is not authenticated');
      }

      const itemRef = ref(this.db, 'items/');
      const snapshot = await get(itemRef);
      if (snapshot.exists()) {
        const items = snapshot.val();
        // Transform the object into an array
        return Object.keys(items).map((key) => ({
          id: key,
          ...items[key],
        }));
      } else {
        return [];
      }
    } catch (error: any) {
      throw error;
    }
  }
}
