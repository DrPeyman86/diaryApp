import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventsComponent } from './new-events/new-events.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: NewEventsComponent},
  { path: 'pastEvents', component: PastEventsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
