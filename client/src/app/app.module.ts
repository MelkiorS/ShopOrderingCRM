import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/interceptors/token.interceptor";
import {AuthComponent} from "./shared/components/auth/auth.component";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register/register.component";
import {MainViewComponent} from "./main-view/main-view.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    MainViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
