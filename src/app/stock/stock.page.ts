import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {IonReorderGroup,LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {IonSlides } from '@ionic/angular';
import SignaturePad from 'signature_pad';
import { Globalization } from '@ionic-native/globalization/ngx';
import { IonModal } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
//service
import {TicketsService} from "../service/tickets.service";
@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  @ViewChild('canvasOne') canvasElOne: ElementRef;
  @ViewChild('canvasTow') canvasElTow: ElementRef;
  public segment = 0;
  public close:any;
  public confirm:any;
  public userId:any;
  public password:any;
  public userEmail:any;
  public userName:any;
  public stockName:any;
  public stockMapId:any;
  public stockAddress:any;
  public stockPhone:any;
  public stock:any;
  public callNumberMsgError:any;
  public newParts:any;
  public returnParts:any;
  public technicalParts:any;
  public signaturePadReturn: SignaturePad;
  public signaturePadTecnical: SignaturePad;
  public signatureImgReturn: string;
  public signatureImgTecnical: string;
  public clear: string;
  public save: string;
  public operationResult:any;
  public returnStockPartsData:any;
  public returnArraStockNewPartsFromServer:any;
  public returnArraStockPartsFromServer:any;
  public returnArraStockTechnicalPartsFromServer:any;
  public returnStockPartsArray:any = [];
  public returnStockPartsArraySelected:any = [];
  public returnStockNewPartsArray:any = [];
  public returnStockNewPartsArraySelected:any = [];
  public returnStockTechnicalPartsArray:any = [];
  public returnStockTechnicalPartsArraySelected:any = [];
  public countStockPartsArray:any=2;
  public countStockNewPartsArray:any=2;
  public countStockTechnicalPartsArray:any=2;
  public ticketActionEmpty:any;
  public stockPartsArraySelected:any = [];
  public fullDate:any;
  public returnUpdateNewStockData:any;
  public updateStockMsgSuccess:any;
  public updateStockMsgError:any;
  public stockPartsArraySelectedDelv:any = [];
  public technicalPartsArraySelectedDelv:any = [];
  public valuseStockNorA:any = 0;
  public valueStockPlos:any = 0;
  public valuseTechnicalNorA:any = 0;
  public valueTechnicalPlos:any = 0;
  public saveSignatureMsgAdd:any;
  public selectTechnical:any;
  public returnTechnicalNameData:any;
  public returnArraTechnicalNameFromServer:any;
  public returnTechnicalNameArray:any = [];
  public selectTechnicalNameForStock:any;
  title = 'signatureJS';
  name: string;
  //----------------------------------------------------
  //this variables for system
  public checkLanguage: any=0;
  public language: string;
  public message:any;
  public toastStyle:any;
  constructor(private callNumber: CallNumber,private ticketsService: TicketsService,private activaterouter : ActivatedRoute,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.menu.enable(true,"inMenue");
    this.checkInternetData();
  }
  //this function to go to select slide
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  //this function to go to select slide
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  //start functions for Signature
  ngAfterViewInit() {
    this.signaturePadReturn = new SignaturePad(this.canvasElOne.nativeElement);
    this.signaturePadTecnical = new SignaturePad(this.canvasElTow.nativeElement);
  }
  startDrawing(event: Event) {
  }
  moved(event: Event) {
  }
  clearPad(type:any) {
    if(type == 1)
      this.signaturePadReturn.clear();
    else
      this.signaturePadTecnical.clear();
  }
  savePad(type:any) {
    if(type == 1){
      const base64DataReturn = this.signaturePadReturn.toDataURL();
      this.signatureImgReturn = base64DataReturn;
    }else{
      const base64DataTecnical = this.signaturePadTecnical.toDataURL();
      this.signatureImgTecnical = base64DataTecnical;
    }
    this.message = this.saveSignatureMsgAdd;
    this.displayResult(this.message);
  }
  initialiseTranslation(){
    this.translate.get('stock').subscribe((res: string) => {
      this.stock = res;
    });
    this.translate.get('clear').subscribe((res: string) => {
      this.clear = res;
    });
    this.translate.get('save').subscribe((res: string) => {
      this.save = res;
    });
    this.translate.get('new_parts').subscribe((res: string) => {
      this.newParts = res;
    });
    this.translate.get('return_parts').subscribe((res: string) => {
      this.returnParts = res;
    });
    this.translate.get('technical_parts').subscribe((res: string) => {
      this.technicalParts = res;
    });
    this.translate.get('call_number_msg_error').subscribe((res: string) => {
      this.callNumberMsgError = res;
    });
    this.translate.get('ticket_action_empty_title_larg').subscribe((res: string) => {
      this.ticketActionEmpty = res;
    });
    this.translate.get('update_stock_msg_success').subscribe((res: string) => {
      this.updateStockMsgSuccess = res;
    });
    this.translate.get('update_stock_msg_error').subscribe((res: string) => {
      this.updateStockMsgError = res;
    });
    this.translate.get('save_signature_msg_add').subscribe((res: string) => {
      this.saveSignatureMsgAdd = res;
    });
    this.translate.get('select_technical').subscribe((res: string) => {
      this.selectTechnical = res;
    });
    this.translate.get('close').subscribe((res: string) => {
      this.close = res;
    });
    this.translate.get('confirm').subscribe((res: string) => {
      this.confirm = res;
    });
  }
  //function To Get All Data
  async functionReturnData(date:any,mapId:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    let sendValues = {"date":"2023-01-10",'stock_id':'8'};
    //return stock array
    this.ticketsService.stockParts(sendValues).then(async data=>{
      this.returnStockPartsData = data;
      this.operationResult = this.returnStockPartsData.status;
      if(this.operationResult){
        this.returnStockPartsArray=[];
        this.returnStockPartsArraySelected=[];
        this.returnStockNewPartsArray=[];
        this.returnStockNewPartsArraySelected=[];
        this.returnStockTechnicalPartsArray=[];
        this.returnStockTechnicalPartsArraySelected=[];
        this.returnArraStockNewPartsFromServer = this.returnStockPartsData.new_parts;
        this.returnArraStockPartsFromServer = this.returnStockPartsData.stock_parts;
        this.returnArraStockTechnicalPartsFromServer = this.returnStockPartsData.technical_parts;
        for(let i = 0; i < this.returnArraStockNewPartsFromServer.length;i++) {
          this.returnStockNewPartsArray[i]=[];
          this.returnStockNewPartsArray[i]['id'] = this.returnArraStockNewPartsFromServer[i].id;
          this.returnStockNewPartsArray[i]['part_id'] = this.returnArraStockNewPartsFromServer[i].id;
          this.returnStockNewPartsArray[i]['name'] = this.returnArraStockNewPartsFromServer[i].name;
          this.returnStockNewPartsArray[i]['delivered'] = 0;
        }
        //new
        for(let i = 0; i < this.returnArraStockNewPartsFromServer.length;i++) {
          this.returnStockNewPartsArraySelected[i]=[];
          this.returnStockNewPartsArraySelected[i]['part_id'] = this.returnArraStockNewPartsFromServer[i].id;
          this.returnStockNewPartsArraySelected[i]['delivered'] = 0;
        }
        for(let i = 0; i < this.returnArraStockNewPartsFromServer.length;i++) {
          this.returnStockNewPartsArraySelected[i]=[];
          this.returnStockNewPartsArraySelected[i]['part_id'] = this.returnArraStockNewPartsFromServer[i].id;
          this.returnStockNewPartsArraySelected[i]['delivered'] = 0;
        }
        ///stock
        for(let i = 0; i < this.returnArraStockPartsFromServer.length;i++) {
          this.returnStockPartsArray[i]=[];
          this.returnStockPartsArray[i]['id'] = this.returnArraStockPartsFromServer[i].id;
          this.returnStockPartsArray[i]['name'] = this.returnArraStockPartsFromServer[i].name;
        }
        for(let i = 0; i < this.returnArraStockPartsFromServer.length;i++) {
          this.returnStockPartsArraySelected[i]=[];
          this.returnStockPartsArraySelected[i]['part_id'] = this.returnArraStockPartsFromServer[i].id;
          this.returnStockPartsArraySelected[i]['returned'] = 0;
        }
        ///Technical
        for(let i = 0; i < this.returnArraStockTechnicalPartsFromServer.length;i++) {
          this.returnStockTechnicalPartsArray[i]=[];
          this.returnStockTechnicalPartsArray[i]['id'] = this.returnArraStockTechnicalPartsFromServer[i].id;
          this.returnStockTechnicalPartsArray[i]['name'] = this.returnArraStockTechnicalPartsFromServer[i].name;
          this.returnStockTechnicalPartsArray[i]['disabled'] = 'false';
        }
        for(let i = 0; i < this.returnArraStockTechnicalPartsFromServer.length;i++) {
          this.returnStockTechnicalPartsArraySelected[i]=[];
          this.returnStockTechnicalPartsArraySelected[i]['part_id'] = this.returnArraStockTechnicalPartsFromServer[i].id;
          this.returnStockTechnicalPartsArraySelected[i]['delivered'] = 0;
        }
        if(this.returnStockNewPartsArray.length != 0)
          this.countStockNewPartsArray = 1;
        else
          this.countStockNewPartsArray = 0;
        if(this.returnStockPartsArray.length != 0)
          this.countStockPartsArray = 1;
        else
          this.countStockPartsArray = 0;
        if(this.returnStockTechnicalPartsArray.length != 0)
          this.countStockTechnicalPartsArray = 1;
        else
          this.countStockTechnicalPartsArray = 0;
      }
    });
    await loading.present();
  }
  //function to select New part
  functionStockNewPartsArray(event:any,itemId:any,index:any){
    if(event.detail.checked){
      this.returnStockNewPartsArraySelected[index]['delivered'] = 1;
    }else{
      this.returnStockNewPartsArraySelected[index]['delivered'] = 0;
    }
  }
  //function Technical Name
  selectTechnicalName(evant:any){
    this.selectTechnicalNameForStock = evant;
  }
  //function to select stock part
  functionStockPartsArray(event:any,itemId:any,index:any){
    if(event.detail.checked){
      this.returnStockPartsArraySelected[index]['returned'] = 1;
    }else{
      this.returnStockPartsArraySelected[index]['returned'] = 0;
    }
  }
  //function to select Technical part
  functionStockTechnicalPartsArray(event:any,itemId:any,index:any){
    if(event.detail.checked){
      for(let i = 0; i < this.returnStockTechnicalPartsArray.length;i++) {
        this.returnStockTechnicalPartsArray[i]['disabled'] = 'true';
      }
      this.returnStockTechnicalPartsArray[index]['disabled'] = 'false';
      this.returnStockTechnicalPartsArraySelected[index]['delivered'] = 1;
    }else{
      for(let i = 0; i < this.returnStockTechnicalPartsArray.length;i++) {
        this.returnStockTechnicalPartsArray[i]['disabled'] = 'false';
      }
      this.returnStockTechnicalPartsArraySelected[index]['delivered'] = 0;
    }
  }
  //end functions for Signature
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
    }else{
      this.stockMapId = await this.storage.get('stockMapId');
      this.stockName = await this.storage.get('stockName');
      this.stockAddress = await this.storage.get('stockAddress');
      this.stockPhone = await this.storage.get('stockPhone');
      let selectData = new Date();
      this.fullDate = selectData.getFullYear() + "-" + (selectData.getMonth() + 1) + "-" + selectData.getDate();
      this.ticketsService.technicals().then(async data=>{
        this.returnTechnicalNameData = data;
        this.operationResult = this.returnTechnicalNameData.status;
        if(this.operationResult){
          this.returnTechnicalNameArray=[];
          this.returnArraTechnicalNameFromServer = this.returnTechnicalNameData.result;
          for(let i = 0; i < this.returnArraTechnicalNameFromServer.length;i++) {
            this.returnTechnicalNameArray[i]=[];
            this.returnTechnicalNameArray[i]['id'] = this.returnArraTechnicalNameFromServer[i].id;
            this.returnTechnicalNameArray[i]['name'] = this.returnArraTechnicalNameFromServer[i].name;
          }
        }
      });
      this.functionReturnData(this.fullDate,this.stockMapId);
    }
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
  //save new part function
  async saveNewParts(){
    this.checkInternetData();
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    //this.stockMapId is a stock_id
    let sendValues = {"stock_id":"8",'date':'8','ticket_id':'10','action_type':'1','parts':this.returnStockNewPartsArraySelected};
    this.ticketsService.updateTicket(sendValues).then(async data=>{
      this.returnUpdateNewStockData = data;
      this.operationResult = this.returnUpdateNewStockData.status;
      if(this.operationResult){
        this.message = this.updateStockMsgSuccess;
        this.displayResult(this.message);
        this.functionReturnData(this.fullDate,this.stockMapId)
      }else{
        this.message = this.updateStockMsgError;
        this.displayResult(this.message);
      }
      await loading.present();
    });
  }
  //add all stock opetion function
  functionStockNorATicket(event:any){
    if(event.detail.checked == true){
      this.valuseStockNorA= 1;
    }else{
      this.valuseStockNorA= 1;
    }
  }
  //add all stock opetion function
  functionStockPlosTicket(event:any){
    if(event.detail.checked == true){
      this.valueStockPlos= 1;
    }else{
      this.valueStockPlos= 0;
    }
  }
  //add all Technical opetion function
  functionTechnicalNorATicket(event:any){
    if(event.detail.checked == true){
      this.valuseTechnicalNorA= 1;
    }else{
      this.valuseTechnicalNorA= 1;
    }
  }
  //add all Technical opetion function
  functionTechnicalPlosTicket(event:any){
    if(event.detail.checked == true){
      this.valueTechnicalPlos= 1;
    }else{
      this.valueTechnicalPlos= 0;
    }
  }
  //save Stock part function
  async saveStockParts(){
    this.checkInternetData();
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    //this.stockMapId is a stock_id
    for(let i = 0; i < this.returnStockPartsArraySelected.length;i++) {
      let arraySelected = {};
      if(this.returnStockPartsArraySelected[i]['returned'] == 1)
        arraySelected = {'part_id':this.returnStockPartsArraySelected[i]['part_id'],'returned':this.returnStockPartsArraySelected[i]['returned'],'image':this.signatureImgReturn,'na':this.valuseStockNorA,'plos':this.valueStockPlos}
      else
        arraySelected = {'part_id':this.returnStockPartsArraySelected[i]['part_id'],'returned':this.returnStockPartsArraySelected[i]['returned'],'image':'','na':'0','plos':'0'}
      this.stockPartsArraySelectedDelv.push(arraySelected);
    }
    let sendValues = {"stock_id":"8",'date':'8','ticket_id':'10','action_type':'2','parts':this.stockPartsArraySelectedDelv};
    this.ticketsService.updateTicket(sendValues).then(async data=>{
      this.returnUpdateNewStockData = data;
      this.operationResult = this.returnUpdateNewStockData.status;
      if(this.operationResult){
        this.message = this.updateStockMsgSuccess;
        this.displayResult(this.message);
        this.functionReturnData(this.fullDate,this.stockMapId)
      }else{
        this.message = this.updateStockMsgError;
        this.displayResult(this.message);
      }
      await loading.present();
    });
  }
  //save Technical part function
  async saveTechnicalParts(){
    this.checkInternetData();
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    //this.stockMapId is a stock_id
    for(let i = 0; i < this.returnStockTechnicalPartsArraySelected.length;i++) {
      let arraySelected = {};
      if(this.returnStockTechnicalPartsArraySelected[i]['delivered'] == 1)
        arraySelected = {'part_id':this.returnStockTechnicalPartsArraySelected[i]['part_id'],'delivered':this.returnStockTechnicalPartsArraySelected[i]['delivered'],'image':this.signatureImgReturn,'na':this.valuseTechnicalNorA,'plos':this.valueTechnicalPlos,'engineer_id':this.selectTechnicalNameForStock}
      else
        arraySelected = {'part_id':this.returnStockTechnicalPartsArraySelected[i]['part_id'],'delivered':this.returnStockTechnicalPartsArraySelected[i]['delivered'],'image':'','na':'0','plos':'0','engineer_id':'0'}
      this.technicalPartsArraySelectedDelv.push(arraySelected);
    }
    let sendValues = {"stock_id":"8",'date':'8','ticket_id':'10','action_type':'3','parts':this.technicalPartsArraySelectedDelv};
    this.ticketsService.updateTicket(sendValues).then(async data=>{
      this.returnUpdateNewStockData = data;
      this.operationResult = this.returnUpdateNewStockData.status;
      if(this.operationResult){
        this.message = this.updateStockMsgSuccess;
        this.displayResult(this.message);
        this.functionReturnData(this.fullDate,this.stockMapId)
      }else{
        this.message = this.updateStockMsgError;
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
  async functionOpenMenue(){
    this.menu.enable(true,"inMenue");
    this.menu.open("inMenue");
  }

}
