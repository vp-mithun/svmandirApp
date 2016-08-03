import { Component, OnInit } from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import * as _ from 'lodash';
import { AppUserModel } from '../../datamodels/appusersmodel';
import { CreateUsersPage } from '../create-users/create-users';

@Component({
  templateUrl: 'build/pages/create-users-addedit/create-users-addedit.html',
})
export class CreateUsersAddeditPage {

  opType = '';
  appusermodelObj: AppUserModel;
  createUserForm: ControlGroup;
  submitAttempt: boolean = false;
  standardList: FirebaseListObservable<any>;
  classesList: FirebaseListObservable<any>;

  constructor(private nav: NavController, public af: AngularFire, private navParams: NavParams, private formBuilder: FormBuilder) {
    this.opType = this.navParams.get('opType');

    if (this.opType === 'Edit') {
    } else {
      this.appusermodelObj = new AppUserModel('', '', '', '', '', '');
    }

    this.createUserForm = this.formBuilder.group({
      username: [this.appusermodelObj.username, Validators.required],
      password: [this.appusermodelObj.password, Validators.required],
      displayname: [this.appusermodelObj.displayname, Validators.required],
      // standardselected: [this.appusermodelObj.standardselected],
      // classesselected: [this.appusermodelObj.classesselected],
    });
  }

  ngOnInit() {
    this.standardList = this.af.database.list('/Standards');
    this.classesList = this.af.database.list('/Sections');
  }

  onSaveAppUsers(model) {
    this.submitAttempt = true;

    if (this.createUserForm.valid) {
      let modelObj = this.createUserForm.value as AppUserModel;
      const Useritems = this.af.database.list('/AppUsers');     

      // Create Users in Firebase Auth
      this.af.auth.createUser({ email: modelObj.username, password: modelObj.password })
        .then(function (response) {
          // Then Add it to APP USERS with ROLE as Teacher          
          // let assignObj = {standardId: modelObj.standardselected, classId: modelObj.classesselected};
          let appUser = { userId: response.auth.uid, userName: modelObj.displayname, Role: 2, emailId: response.auth.email };          
          Useritems.push(appUser);

        }).catch(function (err) {
          console.log('Error Creating User ' + err);
        });
        this.nav.setRoot(CreateUsersPage);
    }
  }
}
