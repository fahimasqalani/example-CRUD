import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateCreateComponent } from './candidate-create/candidate-create.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateEditComponent } from './candidate-edit/candidate-edit.component';

const routes: Routes = [
  { path: 'list', component: CandidateListComponent},
  { path: '', component: CandidateCreateComponent},
  { path: 'update/:id', component: CandidateEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
