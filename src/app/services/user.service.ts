import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: string | null = null;
  private email: string = '';
  private status: string = '';

  private readonly USER_LOGGED_IN_KEY = 'userLoggedIn';
  private readonly EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
  private readonly USER_DATA_KEY = 'userData';

  constructor(private firestore: Firestore) {
    this.loadUserData();
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }

  setStatus(status: string): void {
    this.status = status;
  }

  getStatus(): string {
    return this.status;
  }

  private loadUserData(): void {
    const storedData = localStorage.getItem(this.USER_DATA_KEY);
    if (storedData) {
      const userData = JSON.parse(storedData);
      this.userId = userData.userId;
      this.email = userData.email;
      this.status = userData.status;
    }
  }
  private saveUserData(): void {
    const userData = {
      userId: this.userId,
      email: this.email,
      status: this.status,
    };
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  }

  isLoggedIn(): boolean {
    const storedData = localStorage.getItem(this.USER_LOGGED_IN_KEY);

    if (storedData) {
      const { value, expiration } = JSON.parse(storedData);

      if (value === 'true' && expiration > new Date().getTime()) {
        return true;
      } else {
        localStorage.removeItem(this.USER_LOGGED_IN_KEY);
        return false;
      }
    }

    return false;
  }

  private reloadPage(): void {
    window.onload = () => {
      this.loadUserData();
    };
    window.location.reload();
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, 'users'), where('email', '==', email))
      );
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Email verification Error : ', error);
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    const hashedArrayBuffer = await crypto.subtle.digest(
      'SHA-256',
      passwordBuffer
    );
    const hashedPasswordArray = Array.from(new Uint8Array(hashedArrayBuffer));
    const hashedPasswordHex = hashedPasswordArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');

    return hashedPasswordHex;
  }

  private setLoggedInWithExpiration(): void {
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + this.EXPIRATION_TIME;

    const dataToStore = {
      value: 'true',
      expiration: expirationTime,
    };

    localStorage.setItem(this.USER_LOGGED_IN_KEY, JSON.stringify(dataToStore));
  }

  async signUp(email: string, password: string, status: string): Promise<void> {
    try {
      // Check if email exists in the database
      const emailExists = await this.checkEmailExists(email);
      if (emailExists) {
        throw new Error(
          'This email is already assigned to an account. Please Sign In'
        );
      }

      // Encode the password
      const hashedPasswordHex = await this.hashPassword(password);

      // Create a new account
      const userRef = await addDoc(collection(this.firestore, 'users'), {
        email: email,
        password: hashedPasswordHex,
        status: status,
      });

      this.setLoggedInWithExpiration();
      this.setUserId(userRef.id);
      this.setEmail(email);
      this.setStatus(status);
      this.saveUserData();
      this.reloadPage();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const hashedPasswordHex = await this.hashPassword(password);

      const querySnapshot = await getDocs(
        query(collection(this.firestore, 'users'), where('email', '==', email))
      );

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;

        if (user['password'] === hashedPasswordHex) {
          this.setLoggedInWithExpiration();
          this.setUserId(userId);
          this.setEmail(email);
          this.setStatus(user['status']);
          this.saveUserData();
          this.reloadPage();
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
      throw new Error('Erreur lors de la connexion');
    }
  }

  signOut(): void {
    localStorage.removeItem(this.USER_LOGGED_IN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    this.reloadPage();
  }
}
