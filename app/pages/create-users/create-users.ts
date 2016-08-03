import { Component, OnInit } from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import * as _ from 'lodash';
import { AppUserModel } from '../../datamodels/appusersmodel';
import { CreateUsersAddeditPage } from '../create-users-addedit/create-users-addedit';


@Component({
  templateUrl: 'build/pages/create-users/create-users.html',
})
export class CreateUsersPage implements OnInit {
  opType = '';
  appusermodelObj: AppUserModel;
  createUserForm: ControlGroup;
  submitAttempt: boolean = false;
  // standardList: FirebaseListObservable<any>;
  // classesList: FirebaseListObservable<any>;
  appUsersList: FirebaseListObservable<any>;
  isAddEdit: boolean = false;
  isShowAppUsersList: boolean = true;
  formBuilder: FormBuilder = new FormBuilder();


  constructor(private nav: NavController, private navParams: NavParams,
    public af: AngularFire) {
  }

  ngOnInit() {
    // this.standardList = this.af.database.list('/Standards');
    // this.classesList = this.af.database.list('/Sections');
    this.LoadAppUsersList();
  }

  LoadAppUsersList() {
    // const Useritems = this.af.database.list('/AppUsers');
    // Useritems.subscribe(snapshots => {
    //   console.log(snapshots);
    // });
    this.appUsersList = this.af.database.list('/AppUsers');
  }

  onSavAppUsers(model) {
    this.submitAttempt = true;

    if (this.createUserForm.valid) {
      let modelObj = this.createUserForm.value as AppUserModel;
      const Useritems = this.af.database.list('/AppUsers');
      // Create Users in Firebase Auth
      this.af.auth.createUser({ email: modelObj.username, password: modelObj.password })
        .then(function (response) {
          // Then Add it to APP USERS with ROLE as Teacher

          
          let assignObj = {standardId: modelObj.standardselected, classId: modelObj.classesselected};
          let appUser = { userId: response.auth.uid, userName: modelObj.displayname, Role: 2, emailId: response.auth.email, AssignedTo: assignObj };

          Useritems.push(appUser);

          this.isAddEdit = false;
          this.isShowAppUsersList = true;

        }).catch(function (err) {
          console.log('Error Creating User ' + err);
        });
    }
  }

  goToAddAppUsers() {
    this.nav.push(CreateUsersAddeditPage, {opType: 'Add'});
  }

  goToAppUserUpdate(userItem) {
    this.nav.push(CreateUsersAddeditPage, {opType: 'Edit'});
  }
}