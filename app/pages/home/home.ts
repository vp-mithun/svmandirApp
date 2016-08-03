import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import * as _ from 'lodash';
import { AppUsers, AppRoles, StandardClassAssigned } from '../login/users';
import { StudentsListPage } from '../students-list/students-list';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
  appUsrsList: AppUsers[];
  loggedInUser: any;
  assignTolist: FirebaseListObservable<any>;

  constructor(private navCtrl: NavController, public af: AngularFire) {

  }

  ngOnInit() {
    const Useritems = this.af.database.list('/AppUsers');
    let currentUserObj = firebase.auth().currentUser;
    
    Useritems.subscribe(snapshots => {
          this.appUsrsList = snapshots;
          let userObj = _.find(this.appUsrsList, { 'userId': currentUserObj.uid, 'Role': 2 });
          this.loggedInUser = userObj;
          if (!(this.loggedInUser === undefined)) {
            this.LoadAssignedTo();            
          }
          
    });
  }
  LoadAssignedTo()
  {      
    this.assignTolist = this.af.database.list('/AppUsers/' + this.loggedInUser.$key + '/AssignedTo/');
  }
  goToStudentsList(userItem) {
    this.navCtrl.push(StudentsListPage, { selectedStandard: userItem });
  }
}
