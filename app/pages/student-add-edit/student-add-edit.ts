import { Component, OnInit } from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {NavController, NavParams, Page} from 'ionic-angular';
import { StudentInfo } from './studentinfo';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { StudentsListPage } from '../students-list/students-list';
//import {FirebaseService} from '../../providers/firebaseService'


@Component({
  templateUrl: 'build/pages/student-add-edit/student-add-edit.html',
})
export class StudentAddEditPage implements OnInit {
  opType = "";
  studentInfo: any;
  pagesegment = "basic";
  studentForm: ControlGroup;  
  
  submitAttempt: boolean = false;
  //batchesList:any;
  standardList:any;
  classesList:any;
  // batchesList: FirebaseListObservable<any>;
  // groupsList: FirebaseListObservable<any>;
  // standardList: FirebaseListObservable<any>;
  // classesList: FirebaseListObservable<any>;
  // talentsList: FirebaseListObservable<any>;
  // satsangActivitiesList: FirebaseListObservable<any>;
  // MagazinesList: FirebaseListObservable<any>;
  // exAPCList: FirebaseListObservable<any>;

  // studentModel = new StudentInfo(0,null,'SV01-',0,0,0,null,null,null,null,'',
  //                 '','','',null,'', null,'',null,'','','','',null, null,'','',0,null,'','','',null,'','',null, '','','','','','','',null,'',null,'');

  studentModel:StudentInfo;
                  

  constructor(private nav: NavController, private navParams: NavParams, private formBuilder: FormBuilder) {
    this.opType = this.navParams.get("opType");
    this.studentInfo = this.navParams.get("studentInfo");

    if (this.opType === 'Edit') {
        this.studentModel = this.GetStudentDetails(this.studentInfo);
      }
      else{
           this.studentModel = new StudentInfo('',null,null,0,null, null,'',null,'','','',null,'',1);
      }

    //Student Form Validations
  this.studentForm = formBuilder.group({
         			//username: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required])],
              //password: ['', Validators.required]});              
              //batchId: ['', Validators.required],
              DateOfAdmission: [this.studentModel.DateOfAdmission],
              //idPrefix: ['', Validators.required],
              //groupId: ['', Validators.required],
              standardId: [this.studentModel.standardId, Validators.required],
              classId: [this.studentModel.classId],
              seatNo:[this.studentModel.seatNo],
              rollNo:[this.studentModel.rollNo],
              grNo:[this.studentModel.grNo],
              studentId:[this.studentModel.studentId, Validators.required],
              fullName:[this.studentModel.fullName,Validators.required],              
              postalAddress:[this.studentModel.postalAddress],
              cityVillage:[this.studentModel.cityVillage],
              pinCode:[this.studentModel.pinCode],
              parentPhone:[this.studentModel.parentPhone,Validators.required],
              Gender:[this.studentModel.Gender,Validators.required],              
              // schoolLeavingDate:[''],
              // schoolLeavingRemark:[''],
        });
  }

  ngOnInit(){
  //    this.standardList = this.FBService.getStandardsMaster();
    //  this.classesList = this.FBService.getClassesMaster();
      //this.batchesList = this.FBService.getBatchesMaster();
      // this.batchesList = this.af.database.list('/Batches');
      // this.groupsList = this.af.database.list('/Groups');
      // this.standardList =  this.af.database.list('/Standards');
      // this.classesList = this.af.database.list('/Sections');
      // this.talentsList = this.af.database.list('/Talents');
      // this.satsangActivitiesList = this.af.database.list('SatsangActivities');
      // this.MagazinesList = this.af.database.list('/Magazines');
      // this.exAPCList = this.af.database.list('/APC');

      
  }

  //GetStudentDetails based on student Key
  GetStudentDetails(studentDetails):StudentInfo {
    //console.log(JSON.stringify(studentDetails));
    let student = studentDetails;
    return student;
  }

  //Saves the student record to Firebase
  onSaveStudentInfo(model)
  {
    // const studentItems = this.af.database.list('/Students');
    // studentItems.push(this.studentModel);
    // this.nav.setRoot(StudentsListPage);

    this.submitAttempt = true;

		if(this.studentForm.valid){
      let modelObj = this.studentForm.value as StudentInfo;

      if(this.opType === 'Edit')
      {
        modelObj.id = this.studentModel.id;
        // let updateKey = this.FBService.updateStudentDetails(modelObj);
        // if (updateKey!=null) {
        //   this.nav.setRoot(StudentsListPage);
        // }
      }
      else if (this.opType === 'Add') {
        // let newKey = this.FBService.saveStudentDetails(modelObj);
        // if (newKey!=null) {
        //   this.nav.setRoot(StudentsListPage);
        // }
      }

    //   // login usig the email/password auth provider
    // this.FBService.login(modelObj)
    //       .subscribe((data: any) => {
    //         //console.log("the data", data.email)
    //         this.storage.set(this.HAS_LOGGED_IN, true);
    //         this.setUsername(data.email);
    //         this.events.publish('user:login');
    //         this.nav.push(TabsPage);            
    //       },
    //   (error) => {
    //     //alert("Error Logging In: " + error.message)
    //     this.error =  error.message;
    //     console.log(error.message)
    //   });
    }
        
  }

  
}
