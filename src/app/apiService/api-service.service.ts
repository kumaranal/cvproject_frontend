import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse} from '@angular/common/http';
// import {  } from './book';
import { User } from './user';
import { tableData } from './tabledata';
import { catchError, Observable ,throwError,map} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
   token:any;
   passingData:any={
    editflag:false,
    element:null
  }
   //node api link
   REST_API:string="http://localhost:7000/api";
   //set http header
   httpHeaders=new HttpHeaders().set('Content-Type','application/json')
   constructor(private httpClient:HttpClient) { 
   }
 
   
   headers=new HttpHeaders()
   .set('Content-Type','application/json')
   .set('Access-Control-Allow-Origin','*')
   // .set('auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJfaWQiOiI2Mzc5YzU5NWQ5ODRmMDJmZjAxMWU0NzUifSwiaWF0IjoxNjY4OTYwNDk2fQ.xCetWj4t76r_UewF-4OncsSEvTxGT27qjpa6VEbnXoU');
   // .set('Authorization','auth-token'+ this.token);
   //add records
 
   //registration user
   registration(data:User):Observable<any>{
     let API_URL=`${this.REST_API}/register`;
     return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
   }
 
   //login user
   login(data:User):Observable<any>{
     let API_URL=`${this.REST_API}/login`;
     return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
   }
 

   getAllData(){
    let API_URL=`${this.REST_API}/view`
    return this.httpClient.get(API_URL)
    }

    createData(data:any):Observable<any>{
      let API_URL=`${this.REST_API}/save`;
      return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
    }
 
    deleteData(data:any):Observable<any>{
      let API_URL=`${this.REST_API}/delete`;
      return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
    }
    updateData(data:any):Observable<any>{
      let API_URL=`${this.REST_API}/update`;
      return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
    }
    sendmail(data:any):Observable<any>{
      let API_URL=`${this.REST_API}/sendmail`;
      return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
    }

    viewdata(data:any):Observable<any>{
      console.log("userkey",data)
      let API_URL=`${this.REST_API}/viewdata?userId=${data}`;
      return this.httpClient.get(API_URL,data).pipe(catchError(this.handleEroor))
    }
      //myprofile Book
  myprofileapi(data:any):Observable<any>{
    let API_URL=`${this.REST_API}/profileDetails`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
  }
  //search api
  searchapi(data:any):Observable<any>{
    let API_URL=`${this.REST_API}/search`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
  }

   //error handel
   handleEroor(error:HttpErrorResponse){
     let errorMessage='';
     if(error.error instanceof ErrorEvent){
       //handel client error
       errorMessage=error.error.message;
     }else{
       //server error
       errorMessage=`Error Code: ${error.status}\nMessage:${error.message}`;
     }
     console.log(errorMessage);
     return throwError(() => {     
       return errorMessage;
     });
   }
 
 
 
   getLoginCred(){
     var data = localStorage.getItem('token');
     console.log("data",data);
     if (data != null && data != '' && data != undefined) {
       console.log("msin ",JSON.parse(window.atob(data.split('.')[1])));
       return data;
     }
     else {
       return null;
     }
   }


}
