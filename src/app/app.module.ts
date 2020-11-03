import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModuleModule } from '../demo-material-module/demo-material-module.module';
import { HomeComponent } from './components/home/home.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { Form1Component } from './components/create-event/form1/form1.component';
import { Form2Component } from './components/create-event/form2/form2.component';
import { Form3Component } from './components/create-event/form3/form3.component';
import { Form4Component } from './components/create-event/form4/form4.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreateEventComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    Form4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModuleModule,
    // MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
