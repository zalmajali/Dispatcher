import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {
//url
  private baseUrl = "https://82.165.123.228/Demo/NJ-FMS/Web/api";
  public result:any;
  public userId:any;
  public test:any;
  constructor(private storage: Storage,private http:HttpClient) {
    this.storage.get('userId').then(userId=>{
      this.userId = userId;
      this.userId = this.userId.toString();
    });
  }
  async tickets(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_technical_route",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketsComplete(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_technical_route_complete",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketsOrderRoute(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"order_route",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketAction(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_ticket_action",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketAttachment(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_ticket_attachment",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async stockParts(item:any){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '2sMZrnQciB')
        .set('authId', this.userId)
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"get_stock_part",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketStatus(){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '2sMZrnQciB')
        .set('authId', this.userId)
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"get_ticket_status",'',{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async technicals(){
    return new Promise(resolve => {
      let headers = new HttpHeaders()
        .set('appKey', '2sMZrnQciB')
        .set('authId', this.userId)
        .set('Content-Type', 'application/json');
      this.http.post(this.baseUrl+'/'+"get_technicals",'',{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateTicket(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"update_ticket",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketHomeStatus(){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_home_ticket_status",'',{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateTicketStatus(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"update_ticket_status",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketDetails(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_ticket_details",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketsStatuse(item:any){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_ticket_details",JSON.stringify(item),{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async ticketsPartStatus(){
    let headers = new HttpHeaders()
      .set('appKey', '2sMZrnQciB')
      .set('authId', this.userId)
      .set('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"get_part_status",'',{ headers }).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
