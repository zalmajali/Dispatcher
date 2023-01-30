import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import {ForgetpasswordComponent} from "../forgetpassword/forgetpassword.component";
//service
import {UserService} from "../service/user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //this variables for page
  public loginTitle:any;
  public loginUserName:any;
  public loginUserPassword:any;
  public loginButton:any;
  public loginUserNameMsg:any;
  public loginPasswordMsg:any;
  public showMessageUser:any = 0;
  public showMessagePass:any = 0;
  public userName:any;
  public password:any;
  public forgotPasswordTitle:any;
  public loginReturnMsgSuccess:any;
  public loginReturnMsgErrorOne:any;
  public returnResultData:any;
  public showPassword: boolean = false;
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
    this.translate.get('login_title').subscribe((res: string) => {
      this.loginTitle = res;
    });
    this.translate.get('forgot_password_title').subscribe((res: string) => {
      this.forgotPasswordTitle = res;
    });
    this.translate.get('login_user_name').subscribe((res: string) => {
      this.loginUserName = res;
    });
    this.translate.get('login_user_password').subscribe((res: string) => {
      this.loginUserPassword = res;
    });
    this.translate.get('login_button').subscribe((res: string) => {
      this.loginButton = res;
    });
    this.translate.get('login_user_name_msg').subscribe((res: string) => {
      this.loginUserNameMsg = res;
    });
    this.translate.get('login_password_msg').subscribe((res: string) => {
      this.loginPasswordMsg = res;
    });
    this.translate.get('login_return_msg_success').subscribe((res: string) => {
      this.loginReturnMsgSuccess = res;
    });
    this.translate.get('login_return_msg_error_one').subscribe((res: string) => {
      this.loginReturnMsgErrorOne = res;
    });
  }
  //this function to show password
  changeInputType(){
    this.showPassword = !this.showPassword;
  }
  //check if add data in user name form
  checkUserName(event){
    this.showMessageUser = 0
    this.userName = event;
    if(this.userName == "" || this.userName == undefined){
      this.showMessageUser = 1
    }
  }
  //check if add data in password form
  checkPassword(event){
    this.showMessagePass = 0;
    this.password = event;
    if(this.password == "" || this.password == undefined){
      this.showMessagePass = 1;
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
  //this function to send data to api and check user;
  async checkUser(){
    this.checkInternetData();
    if((this.userName == undefined || this.userName == "") && (this.password == undefined || this.password == "")){
      this.showMessageUser = 1
      this.showMessagePass = 1;
      return false;
    }
    if(this.userName == undefined || this.userName == ""){
      this.showMessageUser = 1
      return false;
    }
    if(this.password == undefined || this.password == ""){
      this.showMessagePass = 1;
      return false;
    }
    if(this.userName != undefined && this.password != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      let sendValues = {'user_name':this.userName,'password':this.password};
      this.userService.login(sendValues).then(async data=>{
        this.returnResultData = data;
        if(this.returnResultData.status){
          await this.storage.set('userId',this.returnResultData.engineer.id);
          await this.storage.set('password',this.password);
          await this.storage.set('userFirstName',this.returnResultData.engineer.first_name);
          await this.storage.set('userlastName',this.returnResultData.engineer.last_name);
          await this.storage.set('userGender',this.returnResultData.engineer.gender);
          await this.storage.set('userEmail',this.returnResultData.engineer.email);
          await this.storage.set('userName',this.returnResultData.engineer.user_name);
          await this.storage.set('userLanguage',this.returnResultData.engineer.language);
          await this.storage.set('userNotification',this.returnResultData.engineer.notification);
          await this.storage.set('taskDuration',this.returnResultData.task_duration);
          this.message = this.loginReturnMsgSuccess;
          //this for go to home page
          this.navCtrl.navigateRoot("/home");
          this.displayResult(this.message);
        }else{
          this.message = this.loginReturnMsgErrorOne;
          this.displayResult(this.message);
        }
        await loading.present();
      });
    }
  }
  //this function to open forget password model;
  async functionForGotPassword(){
    let model = await this.modalController.create({
      component:ForgetpasswordComponent,
      animated:true,
      cssClass:"modalOpenCss"
    });
    await model.present();
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
    this.menu.enable(true,"outMenue");
    this.menu.open("outMenue");
  }
}
