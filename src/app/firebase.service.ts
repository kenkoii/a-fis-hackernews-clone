import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  loginWithFacebook() {
    console.log('Login Clicked!');
    return new Promise<any> ((resolve, reject) => {
      const provider = new firebase
                            .auth
                            .FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
          .then(res => {
            resolve(res);
          }, err => {
            console.log(err);
            reject(err);
          });
    });
  }

  logout() {
    return new Promise<any> ((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(res => resolve(res), err => reject(err));
    });
  }

  getList(route: string, count: number = 10, startAt: number = 0) {
    return this.db.list(route, ref => {
      return ref;
    });
  }

  getObject(route: string) {
    return this.db.object(route);
  }

  updateList(route: string, key: string, item: any) {
    return new Promise<any> ((resolve, reject) => {
      this.db.list(route).update(key, item)
        .then(res => resolve(res), err => reject(err));
    });
  }

  
}
