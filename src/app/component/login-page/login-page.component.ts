import { Component,NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/apiService/api-service.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm:FormGroup;
  saveformflag :any= false;
  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:ApiServiceService) {
    this.loginForm=this.formBuilder.group({
      name:[''],
      password:['']
    })
  }  ngOnInit(): void {
  }
  onSubmit(){
    console.log("submit");
    if(!this.loginForm.valid){
      this.saveformflag =true;
      // alert("credential are invalid");

      return;

    }

    this.crudApi.login(this.loginForm.value).subscribe((res:any)=>{
      console.log("res",res);
      if((res.msg.toLowerCase())=="success")
      {
        console.log(res)
        localStorage.setItem('token',res.token);
        
        this.ngZone.run(()=>{
        this.router.navigate(['homepage']);
      
      }),(err:any)=>{
        console.log(err);
      }}
      else{
        console.log(" credential not right");

      }
    })
  }
  register(){
    console.log("register");
    this.ngZone.run(()=>{
      this.router.navigateByUrl(`register`);
    })
  }

  clear(){
    this.loginForm.patchValue({'email':''})
    this.loginForm.patchValue({'password':''})
  }
}
