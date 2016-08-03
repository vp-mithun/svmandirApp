import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginPage } from '../login/login';


@Component({
  templateUrl: 'build/pages/account-page/account-page.html',
})
export class AccountPage {

  constructor(private nav: NavController, public af: AngularFire) {

  }

  logout()
  {
    this.af.auth.logout();
    this.nav.setRoot(LoginPage);
  }

}
