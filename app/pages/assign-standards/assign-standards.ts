import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import * as _ from 'lodash';
import { AppUserModel } from '../../datamodels/appusersmodel';
import { AssignStandardsAddEditPage } from '../assign-standards-add-edit/assign-standards-add-edit';


@Component({
  templateUrl: 'build/pages/assign-standards/assign-standards.html',
})
export class AssignStandardsPage implements OnInit {
  appUsersList: FirebaseListObservable<any>;
  teachersList: AppUserModel[]; 

  constructor(private nav: NavController, public af: AngularFire) {

  }
  ngOnInit() {
    this.LoadAppUsersList();
  }

  LoadAppUsersList() {
    this.appUsersList = this.af.database.list('/AppUsers');
    let listObj: AppUserModel[];

    this.appUsersList
      .subscribe(snapshots => {
        listObj = snapshots;        
      });

      this.teachersList = _.filter(listObj, {Role: 2});      
  }

  goToAssignStandardsList(userItem) {
    this.nav.push(AssignStandardsAddEditPage, { selectedTeacher: userItem });
  }
}
