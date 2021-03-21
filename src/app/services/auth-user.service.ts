import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private afAuth: AngularFireAuth) { }


  
  login(email: string,password: string){
    return new Promise((resolve,reject)=>{
      this.afAuth.signInWithEmailAndPassword(email,password)
      .then((userData)=>resolve(userData),(error)=>reject(error))
    })
  }

  getAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth))
  }
  logOut(){
    this.afAuth.signOut();
  }
}
