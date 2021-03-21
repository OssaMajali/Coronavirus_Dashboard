
import { AuthUserService } from './../services/auth-user.service';
import { Observable } from 'rxjs';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../corona/Contact';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoggedIn: boolean=false 
  userLoggedIn: string
  contacts: Observable<Contact[]>
  constructor(private afs: ContactService ,
             private authService: AuthUserService,
             private route: Router
           ) { 
                this.contacts= this.afs.getAll()
              }

  deleteContact(contact){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ED4C67',
      confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
      if (result.value) {
        this.afs.delete(contact)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })





  }
  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        this.userLoggedIn=auth.email
      }else{
        this.isLoggedIn=false;
      }
    })
  }
 onLogOut(){
   this.authService.logOut()
 }
  

}
