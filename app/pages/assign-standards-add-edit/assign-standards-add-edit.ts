import { Component, OnInit } from '@angular/core';
import { NavParams, Modal, NavController, ViewController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';

@Component({
  templateUrl: 'build/pages/assign-standards-add-edit/assign-standards-add-edit.html',
})
export class AssignStandardsAddEditPage implements OnInit {
  selectedTeacher: any;
  isAssigned: boolean = false;
  teachersAssignedList: any[];

  constructor(private nav: NavController, public af: AngularFire, private navParams: NavParams, private viewCtrl: ViewController) {
    this.selectedTeacher = this.navParams.get('selectedTeacher');
  }

  ngOnInit() {
    let assignlist = this.af.database.list('/AppUsers/' + this.selectedTeacher.$key + '/AssignedTo');
    let listObj: any[];

    assignlist
      .subscribe(snapshots => {
        listObj = snapshots;
      });

    if (listObj.length > 0) {
      this.isAssigned = true;

      this.teachersAssignedList = listObj;
      console.log(this.teachersAssignedList);
    }
  }

  openAddEditModal() {
    let modal = Modal.create(AssignStandardModal, { selectedTeacher: this.selectedTeacher, selectedStandard: null });
    this.nav.present(modal);
  }

  goToChangeAssignStandard(selectedStandardItem) {
    let modal = Modal.create(AssignStandardModal, { selectedTeacher: this.selectedTeacher, selectedStandard: selectedStandardItem });
    this.nav.present(modal);
  }
}


// Modal Window Code

@Component({
  templateUrl: 'build/pages/assign-standards-add-edit/assignStandardModal.html'
})
/**
 * name
 */
class AssignStandardModal implements OnInit {
  standardList: FirebaseListObservable<any>;
  classesList: FirebaseListObservable<any>;
  assignTeachersForm: ControlGroup;
  submitAttempt: boolean = false;
  assignTeacherObj: StandardClassAssigned;
  teacherObj: any;
  teacherAssignedToObj: any;
  isEdit: boolean = false;

  constructor(public params: NavParams, public viewCtrl: ViewController, public af: AngularFire, private formBuilder: FormBuilder) {
    this.teacherObj = this.params.get('selectedTeacher');
    this.teacherAssignedToObj = this.params.get('selectedStandard');
    this.assignTeacherObj = new StandardClassAssigned();

    if (this.teacherAssignedToObj !== null) {     

      this.assignTeacherObj.standardId = this.teacherAssignedToObj.standardId;
      this.assignTeacherObj.classId = this.teacherAssignedToObj.classesId;
      this.assignTeacherObj.keyValue = this.teacherAssignedToObj.$key;
      this.isEdit = true;

    } else {     

      this.assignTeacherObj.standardId = '';
      this.assignTeacherObj.classId = '';
    }

    this.assignTeachersForm = this.formBuilder.group({
      standardId: [this.assignTeacherObj.standardId, Validators.required],
      classesId: [this.assignTeacherObj.classId, Validators.required],
    });
  }

  ngOnInit() {
    this.standardList = this.af.database.list('/Standards');
    this.classesList = this.af.database.list('/Sections');
  }

  AssignToTeachers(formdata) {
    this.submitAttempt = true;

    if (this.assignTeachersForm.valid) {
      if (this.teacherAssignedToObj === null) {
        let dataObj = this.assignTeachersForm.value as StandardClassAssigned;
        let assignlist = this.af.database.list('/AppUsers/' + this.teacherObj.$key + '/AssignedTo');
        assignlist.push(dataObj).then(function (result) { });
      } else {
        let dataObj = this.assignTeachersForm.value as StandardClassAssigned;
        let assignlist = this.af.database.object('/AppUsers/' + this.teacherObj.$key + '/AssignedTo/' + this.teacherAssignedToObj.$key);
        assignlist.update(dataObj);
      }
      this.dismiss();
    }
  }

  DeleteAssignToTeachers(formdata) {
    this.submitAttempt = true;

    if (this.assignTeachersForm.valid) {
      if (this.teacherAssignedToObj !== null) {
        let assignlist = this.af.database.object('/AppUsers/' + this.teacherObj.$key + '/AssignedTo/' + this.teacherAssignedToObj.$key);
        assignlist.remove();
      }
      this.dismiss();
  }
}

  Cancel() {
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

class StandardClassAssigned
{
    public standardId: string;
    public classId: string;
    public keyValue: string;
}
