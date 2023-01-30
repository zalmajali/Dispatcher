import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import {ChangepasswordComponent} from "../changepassword/changepassword.component";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
//this variables for page
  public profileTitle:any;
  public userId:any;
  public password:any;
  public userEmail:any;
  public userName:any;
  public userGender:any;
  public userFirstName:any;
  public userlastName:any;
  public firstName:any;
  public lastName:any;
  public gender:any;
  public email:any;
  public male:any;
  public female:any;
  public changePassword:any;
  public selectGendar:any;
  //----------------------------------------------------
  //this variables for system
  public checkLanguage: any=0;
  public language: string;
  public message:any;
  public toastStyle:any;
  constructor(private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    this.menu.enable(true,"inMenue");
    this.checkInternetData();
  }
  //this function for render variables in selected lang;
  initialiseTranslation(){
    this.translate.get('profile_title').subscribe((res: string) => {
      this.profileTitle = res;
    });
    this.translate.get('first_name').subscribe((res: string) => {
      this.firstName = res;
    });
    this.translate.get('last_name').subscribe((res: string) => {
      this.lastName = res;
    });
    this.translate.get('gender').subscribe((res: string) => {
      this.gender = res;
    });
    this.translate.get('email').subscribe((res: string) => {
      this.email = res;
    });
    this.translate.get('male').subscribe((res: string) => {
      this.male = res;
    });
    this.translate.get('female').subscribe((res: string) => {
      this.female = res;
    });
    this.translate.get('change_password_title').subscribe((res: string) => {
      this.changePassword = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.userGender = await this.storage.get('userGender');
    if(this.userGender == 1)
      this.selectGendar = this.male;
    else
      this.selectGendar = this.female;
    this.userFirstName = await this.storage.get('userFirstName');
    this.userlastName = await this.storage.get('userlastName');
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
  //this function to open change password model;
  async functionChangePassword(){
    let model = await this.modalController.create({
      component:ChangepasswordComponent,
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
    this.menu.enable(true,"inMenue");
    this.menu.open("inMenue");
  }
}
