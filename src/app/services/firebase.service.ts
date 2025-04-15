import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private Auth = inject(Auth);
  constructor() {}
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
      console.error('Error signing up:', error);
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
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}
