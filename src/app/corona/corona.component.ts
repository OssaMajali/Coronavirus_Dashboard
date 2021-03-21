import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contact } from './Contact';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-corona',
  templateUrl: './corona.component.html',
  styleUrls: ['./corona.component.css']
})
export class CoronaComponent implements OnInit {

 
  posts: any= {
    cases:'',
    deaths:'',
    recovred:''
  };
  contacts: Contact[]
  contact: Contact = {
         id:'',
         name:'',
         email:'',
         message:''
  }
  constructor(private httpClient: HttpClient , 
              private contactService: ContactService
              ) {}


  ngOnInit(): void {

  















    
                this.getAllcontact()
                this.getAllDataApi();
                  }      

   getAllcontact(){
     this.contactService.getAll().subscribe(contacts =>{
       this.contacts=contacts;
       console.log(contacts);
     })
   }
   getAllDataApi(){
    this.httpClient.get('https://corona.lmao.ninja/v2/all')
    .subscribe(response => {
        console.log( response);
        this.posts=response;
    })
   }

   AddContact(){ 
    this.contactService.createContact(this.contact)
    this.contact.name=' ',
    this.contact.email=' ',
    this.contact.message=' '
    Swal.fire(
      'Thank you',
      'for your confidence !',
      'success'
    )
    
    }
  

   
















}
