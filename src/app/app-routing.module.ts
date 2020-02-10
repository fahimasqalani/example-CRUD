import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InterviewComponent } from './interview/interview.component';

const routes: Routes = [
  // { path: '', component: AppComponent},
  { path: 'list', component: InterviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
