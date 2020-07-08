import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(public af: AngularFireAuth) { 
  }

  loginWithEmail(email,password){
    this.af.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message; 
      console.log("sin acceso service");
            alert('No tiene acceso');
      // ...
    });
  }

  loginWithGoogle() {
    this.af.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.af.signOut();
  }

}