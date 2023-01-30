import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
//service
import {UserService} from "../service/user.service";
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
//this variables for page
  public forgotPasswordTitle:any;
  public showMessageUser:any = 0;
  public userName:any;
  public forgotPasswordUserName:any;
  public forgotPasswordButton:any;
  public forgotPasswordUserNameMsg:any;
  public forgotPasswordReturnMsgSuccess:any;
  public forgotPasswordMsgErrorOne:any;
  public returnResultData:any;
//-----------------------------------------------------------
  //this variables for system
  public checkLanguage: any=0;
  public language: string;
  public message:any;
  public toastStyle:any;
  constructor(private userService:UserService,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.menu.enable(true,"outMenue");
    this.checkInternetData();
  }
  //this function for render variables in selected lang;
  initialiseTranslation(){
    this.translate.get('forgot_password_title').subscribe((res: string) => {
      this.forgotPasswordTitle = res;
    });
    this.translate.get('forgot_password_user_name').subscribe((res: string) => {
      this.forgotPasswordUserName = res;
    });
    this.translate.get('forgot_password_button').subscribe((res: string) => {
      this.forgotPasswordButton = res;
    });
    this.translate.get('forgot_password_user_name_msg').subscribe((res: string) => {
      this.forgotPasswordUserNameMsg = res;
    });
    this.translate.get('forgot_password_return_msg_success').subscribe((res: string) => {
      this.forgotPasswordReturnMsgSuccess = res;
    });
    this.translate.get('forgot_password_msg_error_one').subscribe((res: string) => {
      this.forgotPasswordMsgErrorOne = res;
    });
  }
  //check if add data in user name form
  checkUserName(event){
    this.showMessageUser = 0
    this.userName = event;
    if(this.userName == "" || this.userName == undefined){
      this.showMessageUser = 1
    }
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
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
  //this function to send data to api and send Password;
  async forgotPassword(){
    this.checkInternetData();
    if(this.userName == undefined || this.userName == ""){
      this.showMessageUser = 1
      return false;
    }
    if(this.userName != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      let sendValues = {'user_name':this.userName};
      this.userService.forgetPassword(sendValues).then(async data=>{
        this.returnResultData = data;
        if(this.returnResultData.status){
          this.message = this.forgotPasswordReturnMsgSuccess;
          this.displayResult(this.message);
          this.modalController.dismiss({});
        }else{
          this.message = this.forgotPasswordMsgErrorOne;
          this.displayResult(this.message);
        }
        await loading.present();
      });
    }
  }
  //this function to close forget password model;
  async functioncloseModel(){
    this.modalController.dismiss({});
  }
  //this function to return result of operation;
  async displayResult(message){
    this.translate.get('toastStyle').subscribe((res: string) => {
      this.toastStyle = res;
    });
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass:'toastStyle',
      color:""
    });
    await toast.present();
  }
}
