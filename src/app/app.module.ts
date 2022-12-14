import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
