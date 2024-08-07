import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RestaurantItemComponent } from './components/elements/restaurant-item/restaurant-item.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { HeaderComponent } from './components/elements/header/header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { AuthGuard } from './guards/AuthGuard.guard';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DatePipe } from '@angular/common';
import { LexChatbotComponent } from './components/lex-chatbot/lex-chatbot.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'results', component: SearchListComponent, data:{requiresLogin: true}, canActivate:[AuthGuard] },
  { path: 'details/:id', component: RestaurantDetailsComponent, data:{requiresLogin: true}, canActivate:[AuthGuard] },
  { path: 'reservations', component: BookingsComponent, data:{requiresLogin: true}, canActivate:[AuthGuard] },
  { path: 'help', component: LexChatbotComponent, data:{requiresLogin: true}, canActivate:[AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    RestaurantItemComponent,
    SearchListComponent,
    HeaderComponent,
    FiltersComponent,
    RestaurantDetailsComponent,
    BookingsComponent,
    LexChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
