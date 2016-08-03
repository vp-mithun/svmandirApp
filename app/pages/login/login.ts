import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {Storage, LocalStorage, NavController, Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoginModel } from '../../datamodels/loginmodel';
import {AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {HomePage} from '../../pages/home/home';
import * as _ from 'lodash';
import { AppUsers, AppRoles, StandardClassAssigned } from './users';


@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  loginForm: ControlGroup;
  loginObj = new LoginModel('', '');
  usernameChanged: boolean = false;
  passwordChanged: boolean = false;
  error: any;
  appUsrsList: AppUsers[];
  submitAttempt: boolean = false;
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);

  constructor(private nav: NavController, private formBuilder: FormBuilder, public af: AngularFire, private events: Events) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required])],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitAttempt = true;
    if (this.loginForm.valid) {
      let modelObj = this.loginForm.value as LoginModel;

      // login usig the email/password auth provider
      this.af.auth.login({ email: modelObj.username, password: modelObj.password }, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        // this.storage.set(this.HAS_LOGGED_IN, true);
        // this.setUsername(modelObj.username); // Fetch Auth Data TO DO
        //this.events.publish('user:login');
        const Useritems = this.af.database.list('/AppUsers');
        let currentUserObj = firebase.auth().currentUser;
        Useritems.subscribe(snapshots => {
          this.appUsrsList = snapshots;

          let noSuperAdminObj = _.find(this.appUsrsList, { 'emailId': 'svmandir.head@gmail.com' });

          // let userObj = _.find(this.appUsrsList, { 'userId': authData.uid, 'Role': AppRoles.Admin });
          // console.log(userObj);

          if (noSuperAdminObj === undefined) {
            // This will ensure superAdmin added to AppUsers First time 
            this.AddSuperAdminToAppUsers(currentUserObj);
          } else {
            let userObj = _.find(this.appUsrsList, { 'userId': authData.uid, 'Role': 1 });

            if (userObj === undefined) {
              this.events.publish('user:login');
            }else {
              // User is Admin, Enable Admin Menu
              this.events.publish('Superuser:login');
            }            
          }
        });
        this.nav.setRoot(HomePage);

      }).catch((error) => {
        this.error = error;
      });
    }
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  AddSuperAdminToAppUsers(curUserObj) {
    const Useritems = this.af.database.list('/AppUsers');
    let assignObj = [];


    let appUser = { userId: curUserObj.uid, userName: 'SVMandir Head', Role: 1, emailId: curUserObj.email, AssignedTo: assignObj }
    // appUser.userId = curUserObj.uid;
    // appUser.userName = 'SVMandir Head';
    // appUser.Role = AppRoles.Admin;
    // appUser.emailId = curUserObj.email;

    Useritems.push(appUser);
  }
}
