import { Component, OnInit,ViewChild } from '@angular/core';
import {IonReorderGroup,LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import { ItemReorderEventDetail } from '@ionic/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
//service
import {TicketsService} from "../service/tickets.service";
import {TicketactionComponent} from "../ticketaction/ticketaction.component";
import {TicketattachmentComponent} from "../ticketattachment/ticketattachment.component";
declare var google:any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  public map: any;
  public directionsService:any;
  public directionsDisplay:any;
  public ticketsTitle:any;
  public totalKm:any;
  public totalTime:any;
  public searchPlaceholder:any;
  public sorting:any;
  public distance:any;
  public time:any;
  public stockName:any;
  public searchValues:any;
  public orderByData:any;
  public userId:any;
  public password:any;
  public userEmail:any;
  public userName:any;
  public allpath:any=[];
  public operationResult:any;
  public returnTicketsData:any;
  public returnArrayTicketsFromServer:any;
  public returnTicketsArray:any = [];
  public ticketOrder:any = [];
  public ticketOrderNew:any = [];
  public start:any;
  public end:any;
  public returnTicketStatusData:any;
  public returnArrayTicketStatusFromServer:any;
  public returnTicketStatusArray:any = [];
  public selectStatus:any;
  public begin:any;
  public finish:any;
  public close:any;
  public confirm:any;
  public tacke:any;
  public yes:any;
  public no:any;
  public messageAlert:any;
  public returnUpdateTicketStatusData:any;
  public updateTicketStatusMsgSuccess:any;
  public updateTicketStatusMsgErrorOne:any;
  public callNumberMsgError:any;
  public returnUpdateTicketsData:any;
  public ticketOrderRouteMsgSuccess:any;
  public ticketOrderRouteMsgError:any;
  public labelCar:any=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public eta:any;
  //----------------------------------------------------
  //this variables for system
  public checkLanguage: any=0;
  public language: string;
  public message:any;
  public toastStyle:any;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private callNumber: CallNumber,private ticketsService: TicketsService,private alertController:AlertController,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.menu.enable(true,"inMenue");
    this.checkInternetData();
  }
  //this function for render variables in selected lang;
  initialiseTranslation(){
    this.translate.get('tickets_title').subscribe((res: string) => {
      this.ticketsTitle = res;
    });
    this.translate.get('total_Km').subscribe((res: string) => {
      this.totalKm = res;
    });
    this.translate.get('total_time').subscribe((res: string) => {
      this.totalTime = res;
    });
    this.translate.get('search_placeholder').subscribe((res: string) => {
      this.searchPlaceholder = res;
    });
    this.translate.get('sorting').subscribe((res: string) => {
      this.sorting = res;
    });
    this.translate.get('distance').subscribe((res: string) => {
      this.distance = res;
    });
    this.translate.get('time').subscribe((res: string) => {
      this.time = res;
    });
    this.translate.get('stock_name').subscribe((res: string) => {
      this.stockName = res;
    });
    this.translate.get('select_status').subscribe((res: string) => {
      this.selectStatus = res;
    });
    this.translate.get('begin').subscribe((res: string) => {
      this.begin = res;
    });
    this.translate.get('finish').subscribe((res: string) => {
      this.finish = res;
    });
    this.translate.get('eta').subscribe((res: string) => {
      this.eta = res;
    });
    this.translate.get('close').subscribe((res: string) => {
      this.close = res;
    });
    this.translate.get('confirm').subscribe((res: string) => {
      this.confirm = res;
    });
    this.translate.get('tacke').subscribe((res: string) => {
      this.tacke = res;
    });
    this.translate.get('yes').subscribe((res: string) => {
      this.yes = res;
    });
    this.translate.get('no').subscribe((res: string) => {
      this.no = res;
    });
    this.translate.get('message_alert').subscribe((res: string) => {
      this.messageAlert = res;
    });
    this.translate.get('update_ticket_status_msg_success').subscribe((res: string) => {
      this.updateTicketStatusMsgSuccess = res;
    });
    this.translate.get('update_ticket_status_error_msg_one').subscribe((res: string) => {
      this.updateTicketStatusMsgErrorOne = res;
    });
    this.translate.get('call_number_msg_error').subscribe((res: string) => {
      this.callNumberMsgError = res;
    });
    this.translate.get('ticket_order_route_msg_success').subscribe((res: string) => {
      this.ticketOrderRouteMsgSuccess = res;
    });
    this.translate.get('ticket_order_route_msg_error').subscribe((res: string) => {
      this.ticketOrderRouteMsgError = res;
    });
  }
  //call of number
  functionCallNumber(numer:any){
    if(numer == "" || numer==undefined || numer==null || numer==0){
      this.message = this.callNumberMsgError;
      this.displayResult(this.message);
    }else{
      this.callNumber.callNumber(numer, true)
        .then(res =>{})
        .catch(err =>{
          this.message = this.callNumberMsgError;
          this.displayResult(this.message);
        });
    }
  }
  //open ticket action model
  async ticketAction(mapId:any){
    let model = await this.modalController.create({
      component:TicketactionComponent,
      animated:true,
      componentProps:{mapId:mapId},
      cssClass:"modalOpenCss"
    });
    await model.present();
  }
  //open ticket attachment model
  async ticketattachment(mapId:any){
    let model = await this.modalController.create({
      component:TicketattachmentComponent,
      animated:true,
      componentProps:{mapId:mapId},
      cssClass:"modalOpenCss"
    });
    await model.present();
  }
  //function To Get All Data
  async functionReturnData(){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    let selectData = new Date();
    let fullDate = selectData.getFullYear() + "-" + (selectData.getMonth() + 1) + "-" + selectData.getDate();
   // let sendValues = {"route_date":fullDate};
    let sendValues = {"route_date":"2022-12-30"};
    this.ticketsService.tickets(sendValues).then(async data=>{
      this.returnTicketsData = data;
      this.operationResult = this.returnTicketsData.status;
      if(this.operationResult){
        let counter = 1;
        this.returnTicketsArray=[];
        this.ticketOrder=[];
        this.returnArrayTicketsFromServer = this.returnTicketsData.result;
        for(let i = 0; i < this.returnArrayTicketsFromServer.length;i++) {
          this.returnTicketsArray[i]=[];
          this.returnTicketsArray[i]['id'] = this.returnArrayTicketsFromServer[i].id;
          this.returnTicketsArray[i]['label']=this.labelCar[i];
          this.returnTicketsArray[i]['routeMapId'] = this.returnArrayTicketsFromServer[i].route_map_id;
          this.returnTicketsArray[i]['ticketId'] = this.returnArrayTicketsFromServer[i].ticket_id;
          this.returnTicketsArray[i]['customerId'] = this.returnArrayTicketsFromServer[i].customer_id;
          this.returnTicketsArray[i]['directionOrder'] = this.returnArrayTicketsFromServer[i].direction_order;
          this.returnTicketsArray[i]['mapType'] = this.returnArrayTicketsFromServer[i].map_type;
          this.returnTicketsArray[i]['mapId'] = this.returnArrayTicketsFromServer[i].map_id;
          this.returnTicketsArray[i]['createdAt'] = this.returnArrayTicketsFromServer[i].created_at;
          this.returnTicketsArray[i]['updatedAt'] = this.returnArrayTicketsFromServer[i].updated_at;
          this.returnTicketsArray[i]['callId'] = this.returnArrayTicketsFromServer[i].call_id;
          this.returnTicketsArray[i]['etaTime'] = this.returnArrayTicketsFromServer[i].eta_time;
          if(this.returnArrayTicketsFromServer[i].eta_time!=null && this.returnArrayTicketsFromServer[i].eta_time!=undefined && this.returnArrayTicketsFromServer[i].eta_time!=0 && this.returnArrayTicketsFromServer[i].eta_time!=""){
            let etaTime = this.returnArrayTicketsFromServer[i].eta_time.split(":");
            if(etaTime[0]!='00')
              this.returnTicketsArray[i]['etaTime'] = etaTime[0]+":"+etaTime[1];
          }
          this.returnTicketsArray[i]['statusName'] = this.returnArrayTicketsFromServer[i].status_name;
          this.returnTicketsArray[i]['customerName'] = this.returnArrayTicketsFromServer[i].customer_name;
          this.returnTicketsArray[i]['custmerPhone'] = this.returnArrayTicketsFromServer[i].custmer_phone;
          this.returnTicketsArray[i]['customerAddress'] = this.returnArrayTicketsFromServer[i].customer_address;
          this.returnTicketsArray[i]['ticketItatusId'] = this.returnArrayTicketsFromServer[i].ticket_status_id;
          this.returnTicketsArray[i]['statusName'] = this.returnArrayTicketsFromServer[i].status_name;
          this.returnTicketsArray[i]['startWork']= 0;
          this.returnTicketsArray[i]['endWork']= 0;
          if(this.returnArrayTicketsFromServer[i].begin_time!=null && this.returnArrayTicketsFromServer[i].begin_time!=undefined && this.returnArrayTicketsFromServer[i].begin_time!=0 && this.returnArrayTicketsFromServer[i].begin_time!=""){
            let startWork = this.returnArrayTicketsFromServer[i].begin_time.split(":");
            if(startWork[0]!='00')
              this.returnTicketsArray[i]['startWork'] = startWork[0]+":"+startWork[1];
          }
          if(this.returnArrayTicketsFromServer[i].finish_time!=null && this.returnArrayTicketsFromServer[i].finish_time!=undefined && this.returnArrayTicketsFromServer[i].finish_time!=0 && this.returnArrayTicketsFromServer[i].finish_time!=""){
            let endWork = this.returnArrayTicketsFromServer[i].finish_time.split(":");
            if(endWork[0]!='00')
              this.returnTicketsArray[i]['endWork'] = endWork[0]+":"+endWork[1];
          }
          this.returnTicketsArray[i]['time'] = this.returnArrayTicketsFromServer[i].eta_time;
          this.returnTicketsArray[i]['lat'] = this.returnArrayTicketsFromServer[i].lat;
          this.returnTicketsArray[i]['lng'] = this.returnArrayTicketsFromServer[i].lng;
          this.returnTicketsArray[i]['order'] = counter;
          this.ticketOrder[i] = [this.returnTicketsArray[i]['id']];
          if(this.returnArrayTicketsFromServer[i].map_type == 1){
            await this.storage.set('stockMapId',this.returnArrayTicketsFromServer[i].map_id);
            await this.storage.set('stockName',this.returnArrayTicketsFromServer[i].customer_name);
            await this.storage.set('stockAddress',this.returnArrayTicketsFromServer[i].customer_address);
            await this.storage.set('stockPhone',this.returnArrayTicketsFromServer[i].custmer_phone);
          }
          if(counter==this.returnArrayTicketsFromServer.length)
            this.end = {lat:parseFloat(this.returnArrayTicketsFromServer[i].lat), lng:parseFloat(this.returnArrayTicketsFromServer[i].lng)};
         else
          this.allpath[i] = {location: {lat:parseFloat(this.returnArrayTicketsFromServer[i].lat), lng:parseFloat(this.returnArrayTicketsFromServer[i].lng)}}
          counter++;
        }
      }
      if(this.returnTicketsArray.length!=0)
        await this.loadMap();
      await loading.present();
    });
  }
  async titcketOrderNew(event: any) {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    this.ticketOrder = event.detail.complete(this.ticketOrder);
    let counter = 1
    for(let i = 0; i < this.ticketOrder.length;i++){
      this.ticketOrderNew[i] = {'id':this.ticketOrder[i][0],"direction_order":counter};
      counter++;
    }
    let sendValues = {'tickets':this.ticketOrderNew};
    this.ticketsService.ticketsOrderRoute (sendValues).then(async data=>{
      this.returnUpdateTicketsData = data;
      this.operationResult = this.returnUpdateTicketsData.status;
      if(this.operationResult){
        this.message = this.ticketOrderRouteMsgSuccess;
        this.displayResult(this.message);
        await this.functionReturnData();
      }else{
        this.message = this.ticketOrderRouteMsgError;
        this.displayResult(this.message);
      }
      await loading.present();
    });
  }
  //check if add data in search form
  checkSearchInput(event){
    this.searchValues = event;
  }
  //display if search value is not empty and display search
  displaySearchInput(){
  }
  //check if add data in user name form
  async selectOrderByValues(event){
    this.orderByData = event;
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.userId = await this.storage.get('userId');
    this.password = await this.storage.get('password');
    this.userEmail = await this.storage.get('userEmail');
    this.userName = await this.storage.get('userName');
    if(this.userId == null || this.password == null || this.userEmail == null || this.userName == null){
      this.storage.remove('userId');
      this.storage.remove('password');
      this.storage.remove('userFirstName');
      this.storage.remove('userlastName');
      this.storage.remove('userGender');
      this.storage.remove('userEmail');
      this.storage.remove('userEmail');
      this.storage.remove('userName');
      this.storage.remove('userLanguage');
      this.storage.remove('userNotification');
      this.navCtrl.navigateRoot('login');
    }
    //return ticket Status of array
    this.ticketsService.ticketHomeStatus().then(async data=>{
      this.returnTicketStatusData = data;
      this.operationResult = this.returnTicketStatusData.status;
      if(this.operationResult){
        this.returnTicketStatusArray=[];
        this.returnArrayTicketStatusFromServer = this.returnTicketStatusData.result;
        for(let i = 0; i < this.returnArrayTicketStatusFromServer.length;i++) {
          this.returnTicketStatusArray[i]=[];
          this.returnTicketStatusArray[i]['id'] = this.returnArrayTicketStatusFromServer[i].id;
          this.returnTicketStatusArray[i]['name'] = this.returnArrayTicketStatusFromServer[i].name;
        }
      }
    });
    await this.functionReturnData();
  }
  loadMap() {
    // Create a map options object
    let mapOptions = {
      zoom: 8,
      center: {lat:32.106282, lng:36.095882}
    };
    // Create the map
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // Initialize the directions service and display
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map,
    });
    // Set the start and end locations and request the directions
    let start = this.allpath[0];
    let end = this.end;
    let request = {
      origin: start,
      destination: end,
      waypoints: this.allpath,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        let directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            geodesic: true,
            strokeColor: "#0000FF",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          },  markerOptions: {
            icon: {
              // Specify the icon image
              url: '../assets/images/lo.png',
            },

          }
        });
        directionsRenderer.setMap(this.map);
        directionsRenderer.setDirections(result);
      }
    });
  }
  //this function to chjange ticket status
  async changeStatuseTicket(evant:any,mapId:any){
    if(evant == 10){
      this.router.navigate(['/task', {mapId:mapId}])
    }else{
      const alert = await this.alertController.create({
        cssClass: 'alertBac',
        mode: 'ios',
        message: this.messageAlert,
        buttons: [
          {
            text: this.yes,
            cssClass: 'alertButton',
            handler: () => {
              let sendValuesStatus = {"ticket_id":mapId,"status_id":evant};
              this.ticketsService.updateTicketStatus(sendValuesStatus).then(async data=>{
                this.returnUpdateTicketStatusData = data;
                this.operationResult = this.returnUpdateTicketStatusData.status;
                if(this.operationResult){
                  this.message = this.updateTicketStatusMsgSuccess;
                  this.displayResult(this.message);
                  this.functionReturnData()
                }else{
                  this.message = this.updateTicketStatusMsgErrorOne;
                  this.displayResult(this.message);
                }
              });
            }
          }, {
            text: this.no,
            cssClass: 'alertButton',
            handler: () => {
              this.message = this.updateTicketStatusMsgErrorOne;
              this.displayResult(this.message);
            }
          }
        ]
      });
      await alert.present();
    }
  }
  //this function to read and return lang of device or selected lang;
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0] == "de" || Val[0] == "en")
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0] == "de" || Val[0] == "en")
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  //this function to check internet in device;
  async checkInternetData(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.message = "asd";
      this.displayResult(this.message);
    })
  }
  //go to start tickets (begin)
  startTickets(mapId:any){
    this.navCtrl.navigateRoot(['/task', {mapId:mapId}])
  }
  stockTickets(){
    this.router.navigate(['/stock'])
  }
  //this function to return result of operation;
  async displayResult(message){
    this.translate.get('toastStyle').subscribe((res: string) => {
      this.toastStyle = res;
    });
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass:'toastStyle',
      color:""
    });
    await toast.present();
  }
  async functionOpenMenue(){
    this.menu.enable(true,"inMenue");
    this.menu.open("inMenue");
  }
}

