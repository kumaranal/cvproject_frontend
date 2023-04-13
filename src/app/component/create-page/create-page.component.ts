import { Component,NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/apiService/api-service.service';
import{ MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  dataForm: FormGroup ;
  imagefile!: File;
  authtoken:any;
  saveformflag :any= false;
  useremail:any;
  userId:any;
constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,public crudApi:ApiServiceService) {
    this.dataForm=this.formBuilder.group({
      workTitle:[''],
      description:[''],
      startDate:[''],
      endDate:[''],
      file:[]
    });
    this.authtoken={
      authtoken: localStorage.getItem('token')
    }
  }

  ngOnInit(): void {
    if(this.authtoken.authtoken)
    {
      this.crudApi.myprofileapi(this.authtoken).subscribe((res:any)=>{
        console.log("data",res)
        this.useremail=res.data.email;
        this.userId=res.data.userId;
      })
    }

    if(this.crudApi.passingData.editflag==true)
    {
      console.log("element",this.crudApi.passingData.element);
     this.patchData(this.crudApi.passingData.element)
    }
    else{
      this.dataForm.patchValue({'startDate':this.formatDate(new Date())})

    }

  }


   private formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  patchData(element:any){
    this.dataForm.patchValue({'workTitle':element.workTitle?element.workTitle:null}),
    this.dataForm.patchValue({'description':element.description?element.description:null}),
    this.dataForm.patchValue({'startDate':this.formatDate(new Date(this.crudApi.passingData.element.startDate))})
    this.dataForm.patchValue({'endDate':this.formatDate(new Date(this.crudApi.passingData.element.endDate))})
    this.dataForm.patchValue({'file':[]})

  }

  checkedit(flag:any){
    console.log("flag",flag)
    if(this.crudApi.passingData.editflag==true){
      return true;
    }
    else{
      return false
    }
  }
  onSubmit(){
    if(!this.dataForm.valid){
      this.saveformflag =true;
      return;
    }

    const formData=new FormData();
    formData.append('workTitle',this.dataForm.value.workTitle);
    formData.append('description',this.dataForm.value.description);
    formData.append('startDate',this.dataForm.value.startDate);
    formData.append('file',this.imagefile,this.imagefile.name);
    formData.append('endDate',this.dataForm.value.endDate);
    formData.append('userId',this.userId);
    // const formData=this.dataForm.value
    // formData.file=(this.imagefile);
    console.log("formdata",formData)
    this.crudApi.createData(formData).subscribe((res:any)=>{
      console.log("register data added successful");
      this.clear();
      // this.sendmail(formData,this.useremail);
      if(res.msg.toUpperCase()=='SUCCESS')
      {
        this.ngZone.run(()=>{
          this.router.navigateByUrl('homepage/viewpage')
        })
      }
      
    })
  }

  // sendmail(formData:any,useremail:any){
  //   let requestparam={
  //     email:useremail,
  //     subject:"Your configuration is stored successfully",
  //     body:`the configuration data =>
  //             worklist:${this.dataForm.value.workTitle},
  //             description:${this.dataForm.value.description},
  //             startDate:${this.dataForm.value.startDate},
  //             endDate:${this.dataForm.value.endDate}
  //             `
  //   }
  //   this.crudApi.sendmail(requestparam).subscribe((res:any)=>{
  //     console.log("register data added successful");
  //     // this.clear();
  //   })
  // }
  getFile(event:any){
    this.imagefile= <File>event.target.files[0];
    console.log("file",this.imagefile);
  }


  onUpdate(){
    if(!this.dataForm.valid){
      this.saveformflag =true;

      return;

    }
    const formData1=new FormData();
      formData1.append('id',this.crudApi.passingData.element._id)
    if(this.dataForm.value.workTitle && this.dataForm.value.workTitle!='' && this.dataForm.value.workTitle != null){
      formData1.append('workTitle',this.dataForm.value.workTitle);
    }
    if(this.dataForm.value.description && this.dataForm.value.description!='' && this.dataForm.value.description != null){
      formData1.append('description',this.dataForm.value.description);

    }
    if(this.dataForm.value.startDate && this.dataForm.value.startDate!='' && this.dataForm.value.startDate != null){
      formData1.append('startDate',this.dataForm.value.startDate);

    }
    if(this.imagefile && this.imagefile.name){
      formData1.append('file',this.imagefile,this.imagefile.name);

    }
    if(this.dataForm.value.endDate && this.dataForm.value.endDate!='' && this.dataForm.value.endDate != null){
      formData1.append('endDate',this.dataForm.value.endDate);

    }
    // const formData1=this.dataForm.value
    // formData1.file=(this.imagefile);
    console.log("formdata",formData1)
    this.crudApi.updateData(formData1).subscribe((res:any)=>{
      console.log("data updated successful");
      if(res.msg.toUpperCase()=='SUCCESS')
      {
        this.ngZone.run(()=>{
          this.router.navigateByUrl('homepage/viewpage')
        })
      }
      // this.clear();
    })
  }
  clear(){
    this.dataForm.patchValue({'workTitle':''})
    this.dataForm.patchValue({'description':''})
    this.dataForm.patchValue({'startDate':''})
    this.dataForm.patchValue({'endDate':''})
    this.dataForm.patchValue({'file':''})
  }
}
