import { Component, OnInit,ViewChild } from '@angular/core';
import {IonReorderGroup,LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//service
import {TicketsService} from "../service/tickets.service";
import {SignatureComponent} from "../signature/signature.component";
import {TicketactionComponent} from "../ticketaction/ticketaction.component";
import {TicketattachmentComponent} from "../ticketattachment/ticketattachment.component";
@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})

export class TaskPage implements OnInit {
  //this variables for page
  public taskTitle:any;
  public close:any;
  public confirm:any;
  public high:any;
  public description:any;
  public parts:any;
  public note:any;
  public eta:any;
  public enterMinutes:any;
  public enterNote:any;
  public appointment:any;
  public entryTime:any;
  public beginTime:any;
  public finishTime:any;
  public status:any;
  public selectStatus:any;
  public userId:any;
  public password:any;
  public userEmail:any;
  public userName:any;
  public save:any;
  public enterTime:any;
  public mapId:any;
  public returnTicketData:any;
  public operationResult:any;
  public ticketId:any;
  public ticketUserId:any;
  public ticketCallId:any;
  public ticketClientCall:any;
  public ticketCallDate:any;
  public ticketProjectId:any;
  public ticketCustmerName:any;
  public ticketCustmerPhone:any;
  public ticketCustmerAddress:any;
  public ticketCustmerStreet:any;
  public ticketCustomerLatitude:any;
  public ticketCustomerLongitude:any;
  public ticketCustmerZipCode:any;
  public ticketCustmerPlace:any;
  public ticketSubject:any;
  public ticketDescription:any;
  public ticketParts:any;
  public ticketStatusId:any;
  public ticketCreatedBy:any;
  public ticketAssignDate:any;
  public ticketCreatedAt:any;
  public ticketUpdatedAt:any;
  public hasParts:any;
  public ticketPartsArray:any = [];
  public ticketPartsCount:any;
  public returnTicketsPartStatusData:any;
  public returnArrayTicketsPartStatusFromServer:any;
  public returnTicketsPartStatusArray:any = [];
  public returnTicketStatusData:any;
  public returnArrayTicketStatusFromServer:any;
  public returnTicketStatusArray:any = [];
  public partsSelectVal:any;
  public partsSelectPartStatusVal:any;
  public partsSelectPartStatusValArray:any = [];
  public partsSelectPartStatusValArraySelect:any = [];
  public ticketNote:any="";
  public ticketEta:any="";
  public ticketEntryTime:any="";
  public ticketBeginTime:any="";
  public ticketFinishTime:any="";
  public ticketsStatusSelectVal:any;
  public complete:any;
  public signatureImg: any=0;
  public valuseNorA:any = 0;
  public valuePlos:any = 0;
  public returnUpdateTicketData:any;
  public updateTicketMsgSuccess:any;
  public updateTicketMsgErrorOne:any;
  public showCompleteButton:any=1;
//----------------------------------------------------
  //this variables for system
  public checkLanguage: any=0;
  public language: string;
  public message:any;
  public toastStyle:any;
  constructor(private ticketsService: TicketsService,private activaterouter : ActivatedRoute,private globalization: Globalization, private geolocation: Geolocation,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.menu.enable(true,"inMenue");
    this.checkInternetData();
  }
  initialiseTranslation(){
    this.translate.get('task_title').subscribe((res: string) => {
      this.taskTitle = res;
    });
    this.translate.get('close').subscribe((res: string) => {
      this.close = res;
    });
    this.translate.get('confirm').subscribe((res: string) => {
      this.confirm = res;
    });
    this.translate.get('high').subscribe((res: string) => {
      this.high = res;
    });
    this.translate.get('description').subscribe((res: string) => {
      this.description = res;
    });
    this.translate.get('parts').subscribe((res: string) => {
      this.parts = res;
    });
    this.translate.get('note').subscribe((res: string) => {
      this.note = res;
    });
    this.translate.get('eta').subscribe((res: string) => {
      this.eta = res;
    });
    this.translate.get('enter_minutes').subscribe((res: string) => {
      this.enterMinutes = res;
    });
    this.translate.get('enter_note').subscribe((res: string) => {
      this.enterNote = res;
    });
    this.translate.get('appointment').subscribe((res: string) => {
      this.appointment = res;
    });
    this.translate.get('entry_time').subscribe((res: string) => {
      this.entryTime = res;
    });
    this.translate.get('entry_time').subscribe((res: string) => {
      this.entryTime = res;
    });
    this.translate.get('begin_time').subscribe((res: string) => {
      this.beginTime = res;
    });
    this.translate.get('finish_time').subscribe((res: string) => {
      this.finishTime = res;
    });
    this.translate.get('status').subscribe((res: string) => {
      this.status = res;
    });
    this.translate.get('select_status').subscribe((res: string) => {
      this.selectStatus = res;
    });
    this.translate.get('save').subscribe((res: string) => {
      this.save = res;
    });
    this.translate.get('enter_time').subscribe((res: string) => {
      this.enterTime = res;
    });
    this.translate.get('complete').subscribe((res: string) => {
      this.complete = res;
    });
    this.translate.get('update_ticket_msg_success').subscribe((res: string) => {
      this.updateTicketMsgSuccess = res;
    });
    this.translate.get('update_ticket_error_msg_one').subscribe((res: string) => {
      this.updateTicketMsgErrorOne = res;
    });
  }
  //open complete model
  async completeTicket(){
    let model = await this.modalController.create({
      component:SignatureComponent,
      animated:true,
      cssClass:"modalOpenCss"
    });
    model.onDidDismiss().then(data=>{
      this.valuseNorA = data.data.valuseNorA;
      this.valuePlos = data.data.valuePlos;
      this.signatureImg = data.data.signatureImg;
    });
    await model.present();
  }
  //function To Get All Data
  async functionReturnData(mapId:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    let sendValues = {"ticket_id":mapId};
    this.ticketsService.ticketDetails(sendValues).then(async data=>{
      this.returnTicketData = data;
      this.operationResult = this.returnTicketData.status;
      if(this.operationResult){
        this.ticketId=this.returnTicketData.ticket.id;
        this.ticketUserId=this.returnTicketData.ticket.user_id;
        this.ticketCallId=this.returnTicketData.ticket.call_id;
        this.ticketClientCall=this.returnTicketData.ticket.client_call;
        this.ticketCallDate=this.returnTicketData.ticket.call_date;
        this.ticketProjectId=this.returnTicketData.ticket.project_id;
        this.ticketCustmerName=this.returnTicketData.ticket.custmer_name;
        this.ticketCustmerPhone=this.returnTicketData.ticket.custmer_phone;
        this.ticketCustmerAddress=this.returnTicketData.ticket.custmer_address;
        this.ticketCustmerStreet=this.returnTicketData.ticket.custmer_street;
        this.ticketCustomerLatitude=this.returnTicketData.ticket.customer_latitude;
        this.ticketCustomerLongitude=this.returnTicketData.ticket.customer_longitude;
        this.ticketCustmerZipCode=this.returnTicketData.ticket.custmer_zip_code;
        this.ticketCustmerPlace=this.returnTicketData.ticket.custmer_place;
        this.ticketSubject=this.returnTicketData.ticket.subject;
        this.ticketDescription=this.returnTicketData.ticket.description;
        this.ticketParts=this.returnTicketData.ticket.parts;
        this.ticketStatusId=this.returnTicketData.ticket.ticket_status_id;
        this.ticketCreatedBy=this.returnTicketData.ticket.created_by;
        this.ticketAssignDate=this.returnTicketData.ticket.assign_date;
        this.ticketCreatedAt=this.returnTicketData.ticket.created_at;
        this.ticketUpdatedAt=this.returnTicketData.ticket.updated_at;
        this.hasParts=this.returnTicketData.ticket.has_parts;
        this.ticketNote = this.returnTicketData.ticket.note;
        this.ticketEta = this.returnTicketData.ticket.eta_time;
        this.ticketBeginTime = this.returnTicketData.ticket.begin_time;
        this.ticketFinishTime = this.returnTicketData.ticket.finish_time;
        this.ticketPartsArray=[];
        for(let i = 0; i < this.returnTicketData.parts.length;i++) {
          this.ticketPartsArray[i]=[];
          this.ticketPartsArray[i]['id'] = this.returnTicketData.parts[i].id;
          this.ticketPartsArray[i]['ticketId'] = this.returnTicketData.parts[i].ticket_id;
          this.ticketPartsArray[i]['name'] = this.returnTicketData.parts[i].name;
          this.ticketPartsArray[i]['quantity'] = this.returnTicketData.parts[i].quantity;
          this.ticketPartsArray[i]['barcode'] = this.returnTicketData.parts[i].barcode;
          this.ticketPartsArray[i]['createdAt'] = this.returnTicketData.parts[i].created_at;
          this.ticketPartsArray[i]['updatedAt'] = this.returnTicketData.parts[i].updated_at;
        }
        let countOfData = this.ticketPartsArray.length;
        if(countOfData == 0)
          this.ticketPartsCount = 0;
        else
          this.ticketPartsCount = 1;
      }
    });
  }
  //function to select Ticket parts and Part Status
  selectTicketsPartStatus(evant:any,val:any){
    this.partsSelectVal = evant;
    this.partsSelectPartStatusVal = val;
    for(let i = 0;i < this.partsSelectPartStatusValArray.length;i++){
      if(this.partsSelectPartStatusValArray[i] == this.partsSelectPartStatusVal){
        const index = this.partsSelectPartStatusValArray[0].indexOf(this.partsSelectPartStatusVal);
        if (index > -1) {
          this.partsSelectPartStatusValArray.splice(index, 1);
        }
      }
    }
    this.partsSelectPartStatusValArraySelect = [{'part_id':this.partsSelectPartStatusVal,'part_status_id':this.partsSelectVal}];
    this.partsSelectPartStatusValArray.push(this.partsSelectPartStatusValArraySelect);
  }
  //function to select Ticket Status
  selectTicketsStatus(evant:any){
    this.ticketsStatusSelectVal = evant;
    if(this.ticketsStatusSelectVal == 10){
      this.showCompleteButton = 1;
    }else{
      this.showCompleteButton = 0;
    }
  }
  //function to get not
  checkTicketNote(evant:any){
    this.ticketNote = evant;
  }
  //function to get eta
  checkTicketEta(evant:any){
    this.ticketEta = evant;
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
    //get data from post mapId
    this.activaterouter.params.subscribe(params => {
      if(params['mapId']!="" && params['mapId']!=null && params['mapId']!=undefined && params['mapId']!=0)
        this.mapId = params['mapId'];
      else
        this.navCtrl.navigateRoot('home');
    });
    //get tickets Part Status from server
    this.ticketsService.ticketsPartStatus().then(async data=>{
      this.returnTicketsPartStatusData = data;
      this.operationResult = this.returnTicketsPartStatusData.status;
      if(this.operationResult){
        let counter = 1;
        this.returnTicketsPartStatusArray=[];
        this.returnArrayTicketsPartStatusFromServer = this.returnTicketsPartStatusData.result;
        for(let i = 0; i < this.returnArrayTicketsPartStatusFromServer.length;i++) {
          this.returnTicketsPartStatusArray[i]=[];
          this.returnTicketsPartStatusArray[i]['id'] = this.returnArrayTicketsPartStatusFromServer[i].id;
          this.returnTicketsPartStatusArray[i]['name'] = this.returnArrayTicketsPartStatusFromServer[i].name;
        }
      }
    });
    //get tickets Status from server
    await this.ticketsService.ticketStatus().then(async data=>{
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
    await this.functionReturnData(this.mapId);
  }
  //open ticket action model
  async ticketAction(){
    let model = await this.modalController.create({
      component:TicketactionComponent,
      animated:true,
      componentProps:{mapId:this.mapId},
      cssClass:"modalOpenCss"
    });
    await model.present();
  }
  //open ticket attachment model
  async ticketattachment(){
    let model = await this.modalController.create({
      component:TicketattachmentComponent,
      animated:true,
      componentProps:{mapId:this.mapId},
      cssClass:"modalOpenCss"
    });
    await model.present();
  }
  //function to edit statuse of ticket
  async updateStatusTicket(){
    this.checkInternetData();
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    let sendValues = {'ticket_id':this.mapId,'parts':this.partsSelectPartStatusValArray, 'note':this.ticketNote,'eta':this.ticketEta,'status_id':this.ticketsStatusSelectVal,'image':this.signatureImg,'na':this.valuseNorA,'plos':this.valuePlos};
    this.ticketsService.updateTicket(sendValues).then(async data=>{
      this.returnUpdateTicketData = data;
      this.operationResult = this.returnUpdateTicketData.status;
      if(this.operationResult){
        this.message = this.updateTicketMsgSuccess;
        this.displayResult(this.message);
        this.navCtrl.navigateRoot('home')
      }else{
        this.message = this.updateTicketMsgErrorOne;
        this.displayResult(this.message);
      }
      await loading.present();
    });
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
  //back Home
  functionBackHome(){
    this.navCtrl.navigateRoot('home')
  }
}
