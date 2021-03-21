import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  {
   
  contacts: Observable<any[]>;
  constructor(db: AngularFireDatabase ){
      this.contacts = db.list('contacts').valueChanges();
   }
}
