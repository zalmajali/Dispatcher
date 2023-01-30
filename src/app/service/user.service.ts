import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url
  private baseUrl = "https://82.165.123.228/Demo/NJ-FMS/Web/api";
  public result:any;
  constructor(private http:HttpClient) {
  }
  httpOptionsVal = {
    headers: new HttpHeaders({
      'appKey': '2sMZrnQciB',
      'Content-Type': 'application/json'
    })
  }
  async login(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"login",JSON.stringify(item),this.httpOptionsVal).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async forgetPassword(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"forget_password",JSON.stringify(item),this.httpOptionsVal).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async changePassword(item:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"change_password",JSON.stringify(item),this.httpOptionsVal).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
