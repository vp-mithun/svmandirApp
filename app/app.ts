import {Component, ViewChild, enableProdMode} from '@angular/core';
import {ionicBootstrap, Events, Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { AccountPage } from './pages/account-page/account-page';
import { CreateUsersPage } from './pages/create-users/create-users';
import { AssignStandardsPage } from './pages/assign-standards/assign-standards';
import {
    FIREBASE_PROVIDERS, defaultFirebase,
    AngularFire, firebaseAuthConfig, AuthProviders,
    AuthMethods
} from 'angularfire2';
enableProdMode();

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
    templateUrl: 'build/app.html',
    providers: [
        FIREBASE_PROVIDERS,
        // Initialize Firebase app  
        defaultFirebase({
            apiKey: "AIzaSyDvF9nLDkHigQS_LPu3UjGWtyQM28_STnU",           
           authDomain: "project-7958784671612383761.firebaseapp.com",
           databaseURL: "https://project-7958784671612383761.firebaseio.com",
           storageBucket: "project-7958784671612383761.appspot.com",
        }),
        firebaseAuthConfig({
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
            remember: 'default',
            scope: ['email']
        })
    ]
})
class MyApp {

    @ViewChild(Nav) nav: Nav;

  appPages: PageObj[] = [
    { title: 'Home', component: HomePage, icon: 'calendar' }
    ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: AccountPage, icon: 'person' }    
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' }    
  ];
  AdminPages: PageObj[] = [
    { title: 'App Users', component: CreateUsersPage, icon: 'contacts' },
    { title: 'Assign Standards', component: AssignStandardsPage, icon: 'contacts' },
    { title: 'Masters', component: LoginPage, icon: 'log-in' }
  ];
  rootPage: any = LoginPage;
  isSuperAdmin: boolean = false;

  constructor(platform: Platform,public af: AngularFire, private events: Events, private menu: MenuController) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      
    });

    // decide which menu items should be hidden by current login status stored in local storage
    this.enableMenu(true);    

    this.listenToLoginEvents();    
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);      
    });

    this.events.subscribe('Superuser:login', () => {
      this.enableMenu(false);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'AdminloggedInMenu');
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }    
  }
}

ionicBootstrap(MyApp);
