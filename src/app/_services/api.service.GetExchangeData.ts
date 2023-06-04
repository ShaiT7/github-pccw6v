import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import JSON_API_URL from '../../assets/configConverterService.json';

//const API_URL = 'https://reqres.in';
const Currency_API_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=a64c0344594dcaeed6fbaedf9706de61&amp;format=1";

@Injectable({
  providedIn: 'root',
})
export class ApiServiceExchangeData {

  config: any;
  configUrl = 'assets/configConverterService.json';
  url_: any;

  constructor(private http: HttpClient) {}

  // public get(url: string): Observable<any> {
  //   return this.http.get(API_URL + '/api/' + url).pipe(map((res) => res));
  // }

  public get():Observable<any> {

    this.url_ = JSON_API_URL["url"];
  
    //return  this.http.get(Currency_API_URL).pipe(map((res) => res));
    return  this.http.get(this.url_).pipe(map((res) => res));
  }

}
// /api/users