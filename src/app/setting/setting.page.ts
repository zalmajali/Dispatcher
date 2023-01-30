import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
//this variables for page
  public settingTitle: any;
  public userId: any;
  public password: any;
  public userEmail: any;
  public userName: any;
  public settingChangeLang: any;
  public settingPushNotifications: any;
  public settingDarkMode: any;
  public menuLabelPolicy: any;
  public menuLabelConditions: any;
  //----------------------------------------------------
  //this variables for system
  public checkLanguage: any = 0;
  public language: string;
  public message: any;
  public toastStyle: any;

  constructor(private globalization: Globalization, private modalController: ModalController, private translate: TranslateService, private http: HttpClient, private router: Router, private network: Network, private menu: MenuController, private storage: Storage, private platform: Platform, private navCtrl: NavController, private toastCtrl: ToastController, private loading: LoadingController) {
    this.menu.enable(true, "inMenue");
    this.checkInternetData();
  }
  //this function for render variables in selected lang;
  initialiseTranslation() {
    this.translate.get('setting_title').subscribe((res: string) => {
      this.settingTitle = res;
    });
    this.translate.get('setting_change_lang').subscribe((res: string) => {
      this.settingChangeLang = res;
    });
    this.translate.get('setting_push_notifications').subscribe((res: string) => {
      this.settingPushNotifications = res;
    });
    this.translate.get('setting_dark_mode').subscribe((res: string) => {
      this.settingDarkMode = res;
    });
    this.translate.get('menu_label_policy').subscribe((res: string) => {
      this.menuLabelPolicy = res;
    });
    this.translate.get('menu_label_conditions').subscribe((res: string) => {
      this.menuLabelConditions = res;
    });
  }

  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.userId = await this.storage.get('userId');
    this.password = await this.storage.get('password');
    this.userEmail = await this.storage.get('userEmail');
    this.userName = await this.storage.get('userName');
    if (this.userId == null || this.password == null || this.userEmail == null || this.userName == null) {
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
    await this.storage.get('checkLanguage').then(async checkLanguage => {
      this.checkLanguage = checkLanguage
    });
    if (this.checkLanguage) {
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    } else {
      if (window.Intl && typeof window.Intl === 'object') {
        let Val = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0] == "de" || Val[0] == "en")
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      } else {
        this.globalization.getPreferredLanguage().then(res => {
          let Val = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0] == "de" || Val[0] == "en")
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {
          console.log(e);
        });
      }
    }
  }
  selectSendOrNotPush(event){

  }
  selectDarkMode(event){

  }
  //this function to check internet in device;
  async checkInternetData() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.message = "asd";
      this.displayResult(this.message);
    })
  }
  //this function to return result of operation;
  async displayResult(message) {
    this.translate.get('toastStyle').subscribe((res: string) => {
      this.toastStyle = res;
    });
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toastStyle',
      color: ""
    });
    await toast.present();
  }
  //this function to change lang of app
  async changeLange(event){
    if(event == 1)
      await this.storage.set('checkLanguage','de');
    else
      await this.storage.set('checkLanguage','en');
    await this.getDeviceLanguage()
  }
  //this function to open policy page
  functionOpenPolicy(){
    this.navCtrl.navigateRoot('privacypolicy');
  }
  //this function to open conditions page;
  functionOpenConditions(){
    this.navCtrl.navigateRoot('termsconditions');
  }
  //OPEN MENUE
  async functionOpenMenue() {
    this.menu.enable(true, "inMenue");
    this.menu.open("inMenue");
  }
}
