import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/apiService/api-service.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table'
// import {MatNativeDate} from '@angular/material/datepicker';
import{MatPaginatorModule} from '@angular/material/paginator'
import{MatPaginator} from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort'
import {MatCard} from '@angular/material/card';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatDatepicker} from '@angular/material/datepicker'; 
import {MatFormField} from '@angular/material/form-field'; 
import {MatInput} from '@angular/material/input';
// import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


export interface PeriodicElement {
  workTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  file: string;

}
@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit {
  books: any = [];
  displayedColumns: string[] = ['workTitle', 'description', 'startDate', 'endDate', 'file','action'];
  dataSource= new MatTableDataSource<PeriodicElement>;
  authtoken:any;
  // userkey:any;

  // dataSource:any;
  data:any=[];
  searchForm: FormGroup ;
   @ViewChild(MatPaginator) paginator:any =MatPaginator;
   @ViewChild(MatSort) sort:any= MatSort;

  constructor(private formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudApi: ApiServiceService) {
    this.searchForm=this.formBuilder.group({
      startDate:[''],
      endDate:[''],
    }); 
    
    let  requestdata={
      editflag:false,
      element:null
  }
  this.crudApi.passingData=requestdata;
  this.authtoken={
    authtoken: localStorage.getItem('token')
  }
  console.log("auth",this.authtoken)

  }

  ngOnInit(): void {

    if(this.authtoken.authtoken)
    {
      this.crudApi.myprofileapi(this.authtoken).subscribe((res:any)=>{
        console.log("responce",res)
        // userkey=res.data.userId;
        this.viewcall(res.data.userId)
      })
    }

  }

  viewcall(data:any){
    this.crudApi.viewdata(data).subscribe(res => {
      console.log("res",res);
      this.data=res
      this.dataSource = new MatTableDataSource(this.data.data);
      console.log("datasource",this.dataSource)
      this.dataSource.paginator=this.paginator;
    })
  }

  applyFilter(event:Event){
    let filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  deletedata(id:any){
    let requestparam={
      id:id
    }
    this.crudApi.deleteData(requestparam).subscribe(res=>{
      this.crudApi.getAllData().subscribe(res => {
        this.data=res
        this.dataSource = this.data.data;
      })
    })
  }

  editdata(element:any){
    let  requestdata={
        editflag:true,
        element:element
    }
    this.crudApi.passingData=requestdata
    this.ngZone.run(()=>{
      this.router.navigateByUrl('homepage/createpage')
    })
  }

  clear(){
    this.searchForm.patchValue({'startDate':''})
    this.searchForm.patchValue({'endDate':''})
  }

  search(){
    console.log("searchform",this.searchForm.value)
    let requestdata={
      'startDate':this.searchForm.value.startDate,
      'endDate': this.searchForm.value.endDate
    }
    this.crudApi.searchapi(requestdata).subscribe(res=>{
        
        this.data=res
        this.dataSource = this.data.data;
    })
  }
}
