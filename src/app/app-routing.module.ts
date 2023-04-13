import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomeComponent} from '../app/component/home/home.component'
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { CreatePageComponent } from './component/create-page/create-page.component';
import { ViewpageComponent } from './component/viewpage/viewpage.component';
const routes: Routes = [

  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'homepage', component:  HomeComponent,
      children: [
        { path: 'viewpage', component: ViewpageComponent },
        { path: 'createpage', component: CreatePageComponent }
      ]
    
  },
  { path: '',   redirectTo: 'home', pathMatch: 'full'}, // redirect to `first-component`
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
