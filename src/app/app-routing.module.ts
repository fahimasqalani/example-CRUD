import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateCreateComponent } from './candidate-create/candidate-create.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

const routes: Routes = [
  { path: 'list', component: CandidateListComponent},
  { path: '', component: CandidateCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
