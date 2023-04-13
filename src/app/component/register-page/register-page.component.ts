import { Component, NgZone,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/apiService/api-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  regForm: FormGroup ;
  saveformflag :any= false;

  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:ApiServiceService) {
    this.regForm=this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      confirm_password:['']
    })
  }
  ngOnInit(): void {
  }
  onSubmit(){
    // this.ngZone.run(()=>{
    //   this.router.navigate(['firstpage']);
    // })
    if(! this.regForm.valid){
      this.saveformflag=true
      // alert("register data invalid");

      return;
    }
    this.crudApi.registration(this.regForm.value).subscribe((res:any)=>{
      console.log("register data added successful");
      this.ngZone.run(()=>{
        this.router.navigate(['login']);
      }),(err:any)=>{
        console.log(err);
      }
    })
  }
  login(){
    console.log("login");
    this.ngZone.run(()=>{
      this.router.navigateByUrl(`login`);
    })
  }

  clear(){
    this.regForm.patchValue({'email':''})
    this.regForm.patchValue({'password':''})
    this.regForm.patchValue({'phone_no':''})
    this.regForm.patchValue({'profile_image':''})
    this.regForm.patchValue({'name':''})
    this.regForm.patchValue({'dob':''})

  }
}
