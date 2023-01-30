import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import SignaturePad from 'signature_pad';
import {IonReorderGroup,LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//service
import {TicketsService} from "../service/tickets.service";
@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {
  //@ViewChild(IonModal) modal: IonModal;
  //title = 'signatureJS';
  //name: string;
  //this variables for page
  @ViewChild('canvas') canvasEl: ElementRef;
  public signaturePad: SignaturePad;
  public signatureImg: any=0;
  public userId:any;
  public password:any;
  public userEmail:any;
  public userName:any;
  public mapId:any;
  public save:any;
  public clear:any;
  public complete:any;
  public ticketfinished:any;
  public returnTicketsOptionsData:any;
  public returnArrayTicketsOptionsFromServer:any;
  public returnTicketsOptionsArray:any = [];
  public operationResult:any;
  public ticketOpetionValArray:any = [];
  public saveSignatureMsgAdd:any;
  public saveSignatureMsgSuccess:any;
  public saveSignatureMsgErrorOne:any;
  public returnResultSignatureData:any;
  public saveSignatureMsgErrorTow:any;
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
    this.translate.get('ticket_finished').subscribe((res: string) => {
      this.ticketfinished = res;
    });
    this.translate.get('save').subscribe((res: string) => {
      this.save = res;
    });
    this.translate.get('clear').subscribe((res: string) => {
      this.clear = res;
    });
    this.translate.get('complete').subscribe((res: string) => {
      this.complete = res;
    });
    this.translate.get('save_signature_msg_add').subscribe((res: string) => {
      this.saveSignatureMsgAdd = res;
    });
    this.translate.get('save_signature_msg_error_one').subscribe((res: string) => {
      this.saveSignatureMsgErrorOne = res;
    });
    this.translate.get('save_signature_msg_success').subscribe((res: string) => {
      this.saveSignatureMsgSuccess = res;
    });
    this.translate.get('save_signature_msg_error_tow').subscribe((res: string) => {
      this.saveSignatureMsgErrorTow = res;
    });
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
      this.returnTicketsOptionsData = data;
      this.operationResult = this.returnTicketsOptionsData.status;
      if(this.operationResult){
        let counter = 1;
        this.returnTicketsOptionsArray=[];
        this.returnArrayTicketsOptionsFromServer = this.returnTicketsOptionsData.result;
        for(let i = 0; i < this.returnArrayTicketsOptionsFromServer.length;i++) {
          this.returnTicketsOptionsArray[i]=[];
          this.returnTicketsOptionsArray[i]['id'] = this.returnArrayTicketsOptionsFromServer[i].id;
          this.returnTicketsOptionsArray[i]['name'] = this.returnArrayTicketsOptionsFromServer[i].name;
        }
      }
    });
  }
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
  //this all functions for signature start hear
  startDrawing(event: Event) {
    console.log(event);
  }
  moved(event: Event) {
  }
  clearPad() {
    this.signaturePad.clear();
    this.signatureImg=0;
  }
  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.message = this.saveSignatureMsgAdd;
    this.displayResult(this.message);
  }
  //this all functions for signature end hear
  //add all ticket opetion function
  functionTicketOpetion(event:any){
    if(event.detail.checked == true){
      let value = event.detail.value;
      this.ticketOpetionValArray.push(value);
    }else{
      let value = event.detail.value;
      for(let i = 0;i < this.ticketOpetionValArray.length;i++){
        if(this.ticketOpetionValArray[i] == value){
          const index = this.ticketOpetionValArray.indexOf(value);
          if (index > -1) {
            this.ticketOpetionValArray.splice(index, 1);
          }
        }
      }
    }
    console.log(this.ticketOpetionValArray);
  }
  //function save all data
  async functionComplete(){
    if(this.signatureImg!=0){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      let sendValues = {'ticket_id':this.mapId,'ticket_option':this.ticketOpetionValArray,'image':this.signatureImg};
      this.ticketsService.tickets(sendValues).then(async data=>{
        this.returnResultSignatureData = data;
        if(this.returnResultSignatureData.status){
          this.message = this.saveSignatureMsgSuccess;
          //this for go to home page
          this.navCtrl.navigateRoot("/home");
          this.displayResult(this.message);
        }else{
          this.message = this.saveSignatureMsgErrorOne;
          this.displayResult(this.message);
        }
        await loading.present();
      });
    }else{
      this.message = this.saveSignatureMsgErrorTow;
      this.displayResult(this.message);
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
