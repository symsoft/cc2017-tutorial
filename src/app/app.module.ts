import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import {UserService} from './components/user/user.service';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      [
        {path: '', component: HomeComponent},
        {path: 'users', component: UserComponent},
        {path: 'form', component: FormComponent},
      ]
    )
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
