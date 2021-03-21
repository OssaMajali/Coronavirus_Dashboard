import { AuthUserService } from './../services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string
  password: string

  constructor(private authUserService: AuthUserService ,
              private  route: Router ,
              private flashMessageService: FlashMessagesService          
              ) { }

  ngOnInit(): void {

    this.authUserService.getAuth().subscribe(auth=>{
      if(auth){
       this.route.navigate(['message']); 
      }
    })
  }
  onLogin(){
    this.authUserService.login(this.email,this.password)
    .then(auth=>{
      if(auth){
       this.flashMessageService.show('You are logged successfly !' ,
       { cssClass: 'alert-success' , 
        timeout: 2000 });
       this.route.navigate(['message']); 
      }
    }).catch(error =>{
      this.flashMessageService.show(error ,
       { cssClass: 'alert-danger' , 
        timeout: 2000 });
    })
    
  }

}
