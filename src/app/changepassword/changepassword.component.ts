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
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
//this variables for page
  public changePasswordTitle:any;
  public userId:any;
  public password:any;
  public userEmail:any;
  public oldPasswordVal:any;
  public newPasswordVal:any;
  public confirmPasswordVal:any;
  public showMessageOldPassword:any = 0;
  public showMessageNewPassword:any = 0;
  public showMessageConfirmPassword:any = 0;
  public showMessageNewConfirmPassword:any = 0;
  public userName:any;
  public returnResultData:any;
  public oldPassword:any;
  public newPassword:any;
  public confirmPassword:any;
  public change:any;
  public changePasswordOldMsg:any;
  public changePasswordNewMsg:any;
  public changePasswordConfirmMsg:any;
  public changePasswordNewConfirmMsg:any;
  public changePasswordReturnMsgSuccess:any;
  public changePasswordMsgErrorOne:any;
  public changePasswordMsgErrorTow:any;
  public showOldPassword:any;
  public showNewPassword:any;
  public showConfirmPassword:any;
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
    this.translate.get('change_password_title').subscribe((res: string) => {
      this.changePasswordTitle = res;
    });
    this.translate.get('old_password').subscribe((res: string) => {
      this.oldPassword = res;
    });
    this.translate.get('new_password').subscribe((res: string) => {
      this.newPassword = res;
    });
    this.translate.get('confirm_password').subscribe((res: string) => {
      this.confirmPassword = res;
    });
    this.translate.get('change').subscribe((res: string) => {
      this.change = res;
    });
    this.translate.get('change_password_old_msg').subscribe((res: string) => {
      this.changePasswordOldMsg = res;
    });
    this.translate.get('change_password_new_msg').subscribe((res: string) => {
      this.changePasswordNewMsg = res;
    });
    this.translate.get('change_password_confirm_msg').subscribe((res: string) => {
      this.changePasswordConfirmMsg = res;
    });
    this.translate.get('change_password_new_confirm_msg').subscribe((res: string) => {
      this.changePasswordNewConfirmMsg = res;
    });
    this.translate.get('change_password_return_msg_success').subscribe((res: string) => {
      this.changePasswordReturnMsgSuccess = res;
    });
    this.translate.get('change_password_msg_error_one').subscribe((res: string) => {
      this.changePasswordMsgErrorOne = res;
    });
    this.translate.get('change_password_msg_error_tow').subscribe((res: string) => {
      this.changePasswordMsgErrorTow = res;
    });
  }
  //this function to show old password
  changeOldPasswordType(){
    this.showOldPassword = !this.showOldPassword;
  }
  //this function to show new password
  changeNewPasswordType(){
    this.showNewPassword = !this.showNewPassword;
  }
  //this function to show confirm password
  changeConfirmPasswordType(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  //check if add data in old password Form
  checkOldPassword(event){
    this.showMessageOldPassword = 0;
    this.oldPasswordVal = event;
    if(this.oldPasswordVal == "" || this.oldPasswordVal == undefined){
      this.showMessageOldPassword = 1;
    }
  }
  //check if add data in New password Form
  checkNewPassword(event){
    this.showMessageNewPassword = 0;
    this.newPasswordVal = event;
    if(this.newPasswordVal == "" || this.newPasswordVal == undefined){
      this.showMessageNewPassword = 1;
    }
  }
  //check if add data in confirm New password Form
  checkConfirmPassword(event){
    this.showMessageConfirmPassword = 0;
    this.showMessageNewConfirmPassword = 0;
    this.confirmPasswordVal = event;
    if(this.confirmPasswordVal == "" || this.confirmPasswordVal == undefined){
      this.showMessageConfirmPassword = 1;
    }else if(this.confirmPasswordVal!=this.newPasswordVal){
      this.showMessageNewConfirmPassword = 1;
    }
  }
  async ngOnInit() {
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
  async changePassword(){
    this.checkInternetData();
    if((this.oldPasswordVal == undefined || this.oldPasswordVal == "") && (this.confirmPasswordVal == undefined || this.confirmPasswordVal == "") && (this.confirmPasswordVal == undefined || this.confirmPasswordVal == "")){
      this.showMessageOldPassword = 1;
      this.showMessageNewPassword = 1;
      this.showMessageConfirmPassword = 1;
      return false;
    }
    if(this.oldPasswordVal == undefined || this.oldPasswordVal == ""){
      this.showMessageOldPassword = 1
      return false;
    }
    if(this.newPasswordVal == undefined || this.newPasswordVal == ""){
      this.showMessageNewPassword = 1
      return false;
    }
    if(this.confirmPasswordVal == undefined || this.confirmPasswordVal == ""){
      this.showMessageConfirmPassword = 1
      return false;
    }
    if(this.confirmPasswordVal!=this.newPasswordVal){
      this.showMessageNewConfirmPassword = 1
      return false;
    }
    if(this.userName != undefined && this.oldPasswordVal != undefined && this.newPasswordVal != undefined && this.confirmPasswordVal != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      let sendValues = {'user_name':this.userName,'password':this.oldPasswordVal,'new_password':this.newPasswordVal,'confirm_password':this.confirmPasswordVal};
      this.userService.changePassword(sendValues).then(async data=>{
        this.returnResultData = data;
        if(this.returnResultData.status){
          this.message = this.changePasswordReturnMsgSuccess;
          this.displayResult(this.message);
          this.modalController.dismiss({});
        }else if(this.returnResultData.message == "wrong_old_password"){
          this.message = this.changePasswordMsgErrorOne;
          this.displayResult(this.message);
        }else if(this.returnResultData.message == "new_confirm_not_match"){
          this.message = this.changePasswordMsgErrorTow;
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
