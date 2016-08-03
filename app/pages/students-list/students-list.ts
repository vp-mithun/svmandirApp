import { Component, OnInit } from '@angular/core';
import {NavController, Page, ActionSheet, NavParams} from 'ionic-angular';
import { StudentAddEditPage } from '../student-add-edit/student-add-edit';
import { StudentDetailPage } from '../student-detail/student-detail';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Students } from './students';
import * as _ from 'lodash';
//import {FirebaseService} from '../../providers/firebaseService'


@Component({
  templateUrl: 'build/pages/students-list/students-list.html'
})
export class StudentsListPage implements OnInit {
  actionSheet: ActionSheet;
  selectedStdClass: any;  
  studentsListItems: any;
  StudentsStandardList: Students[];
  
  //studentsList: FirebaseListObservable<any>;

  constructor(private nav: NavController,private navParams: NavParams, public af: AngularFire) {
    this.selectedStdClass = this.navParams.get('selectedStandard');    
  }

  ngOnInit() {
    
    let studentsList = this.af.database.list('/Students', {
      query: {
        orderByChild: 'standard',
        equalTo: this.selectedStdClass.standardId
      }
     });
     let listObj: Students[];
    studentsList
      .subscribe(snapshots => {        
        listObj = snapshots;
        this.StudentsStandardList =  _.filter(listObj, {class: this.selectedStdClass.classesId});
        //console.log(this.StudentsStandardList.length);
                
      });      
      
      
    // //    this.FBService.getStudentsListByFilters();
    // //this.studentsListItems = this.FBService.getStudentsList();
  }

  goToAddStudentDetail() {
    this.nav.push(StudentAddEditPage, { opType: "Add" })
  }

  goToEditStudentDetail(studentdetail) {
    this.nav.push(StudentAddEditPage, { opType: "Edit", studentInfo: studentdetail });
  }

  goToStudentDetail(studentdetail) {
    this.nav.push(StudentDetailPage, { studentInfo: studentdetail });
  }

   isNumber(x: any): x is number {
    return typeof x === 'number';
  }

  getItems(ev) {    

    // set val to the value of the searchbar
    let val = ev.target.value;

   // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
        //this.StudentsStandardList =  _.filter(listObj, {class: this.selectedStdClass.classesId});
      }
  }

}
