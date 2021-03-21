import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
export interface Country{
  country: string,
  cases: number,
  todayCases: number,
  deaths: number,
  todayDeaths: number,
  recovered: number,
  active: number
}
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {
   id=0;
  country: any 
  constructor(private http: HttpClient) { this.id=0 }

  ngOnInit(): void {
    
    this.getAllContries();
  }
  getAllContries(){
    this.http.get('https://corona.lmao.ninja/v2/countries')
    .subscribe(response=>{  
      this.country =response
    })
  }
 increment(){
   return    this.id=this.id+1
 }
 
}
