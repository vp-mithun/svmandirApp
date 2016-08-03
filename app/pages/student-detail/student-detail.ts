import { Component } from '@angular/core';
import {NavController, NavParams, Page} from 'ionic-angular';
import { StudentInfo } from '../student-add-edit/studentinfo';
import { StudentAddEditPage } from '../student-add-edit/student-add-edit';

@Component({
  templateUrl: 'build/pages/student-detail/student-detail.html',
})
export class StudentDetailPage {
  studentInfo: StudentInfo;

  constructor(private nav: NavController,  private navParams: NavParams) {
    this.studentInfo = this.navParams.get("studentInfo");

  }

    goToStudentDetail() {
    this.nav.push(StudentAddEditPage, {opType:"Edit",studentInfo:this.studentInfo });
  }

}
