import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyConverterHistoryComponent } from './currency-converter-history/currency-converter-history.component';

import { FormsModule, ReactiveFormsModule, AbstractControl, FormBuilder } from '@angular/forms';

import { ApiServiceExchangeData } from './_services/api.service.GetExchangeData';

// import {MyErrorStateMatcher} from './currency-converter/currency-converter.component';
// import { ErrorStateMatcher } from '@angular/material/core';

const appRoutes:Routes=[
  {path: '', redirectTo: '/converter', pathMatch: 'full'},
  {path:'converter', component: CurrencyConverterComponent},
  {path:'history', component: CurrencyConverterHistoryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyConverterHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true}
    )
  ],
  providers: [HttpClientModule, ApiServiceExchangeData],
  bootstrap: [AppComponent]
})
export class AppModule { }
