import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService implements OnInit{
  countries: any
  constructor(private httpClient: HttpClient) { 

  }
  ngOnInit(): void {
    
  }
 
 

}
