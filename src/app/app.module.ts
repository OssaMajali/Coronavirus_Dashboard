import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule,Routes} from '@angular/router'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AngularFireAuthModule} from '@angular/fire/auth'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { CoronaComponent } from './corona/corona.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { TransmissionComponent } from './transmission/transmission.component';
import { TestComponent } from './test/test.component';
import { from } from 'rxjs';
import { ContactService } from './services/contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterPageDashComponent } from './master-page-dash/master-page-dash.component';
import { CountriesComponent } from './countries/countries.component';
import { SortByPipePipe } from './sort-by-pipe.pipe';
import { MapComponent } from './map/map.component';
import { ContinentsComponent } from './continents/continents.component';
import { BotComponent } from './bot/bot.component';


const routes: Routes =[
  {
    path: "",
    component: CoronaComponent
  },
  {
    path: "transmission",
    component: TransmissionComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "message" ,
    component: AdminComponent , canActivate: [AuthGuardGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "chart",
    component: DashboardComponent
  },
  {
    path: "countries",
    component: CountriesComponent
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "continents",
    component: ContinentsComponent
  },
  {
    path: "chat",
    component: BotComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CoronaComponent,
    MasterPageComponent,
    TransmissionComponent,
    TestComponent,
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    MasterPageDashComponent,
    CountriesComponent,
    SortByPipePipe,
    MapComponent,
    ContinentsComponent,
    BotComponent
    
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [ContactService , AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
