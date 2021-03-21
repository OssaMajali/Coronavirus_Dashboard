import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Contact } from '../corona/Contact';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

itemsCollection: AngularFirestoreCollection<Contact>
items: Observable<Contact[]>
itemDoc: AngularFirestoreDocument<Contact>
constructor(private afs: AngularFirestore){
  this.itemsCollection =this.afs.collection('contacts' ,ref => ref.orderBy('name','asc'))
  this.items= this.itemsCollection.snapshotChanges().pipe(map(changes=>{
    return changes.map( a => {
      const data = a.payload.doc.data() as Contact;
      data.id =a.payload.doc.id;
      return data
    }
    )
  }))
}

delete(item: Contact){
   this.itemDoc= this.afs.doc(`contacts/${item.id}`) 
   this.itemDoc.delete();
} 

getAll(){
  return this.items
}



createContact(contact: Contact){
  return this.itemsCollection.add(contact);
}









  /*
  contactsCollection: AngularFirestoreCollection<Contact>;
   contacts: Observable<Contact[]>;
  constructor(private afs: AngularFirestore) { 
     this.contactsCollection = this.afs.collection('contacts');
     this.contacts =  this.contactsCollection.valueChanges();
  }

  getAll(){
    return this.contacts;
  }
  createContact(contact: Contact){
    return this.contactsCollection.add(contact);
  } */
}
