import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssessmentSchema} from '../../shared/model/evaluation/assessment-schema.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {Store} from '@ngrx/store';
import {User} from "../../shared/model/identity/user.interface";
import {UpdateUserAction} from "./user.action";
import {EvaluationModuleState} from "../../evaluation/evaluation-reducers.module";

@Component({
  selector: 'cng-user-editor',
  templateUrl: './user-editor.dialog.html',
})

export class UserEditorDialog implements OnInit {

  private editorForm: FormGroup;
  private edit: boolean;
  private _user: User;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private vcf: ViewContainerRef,
              private dialog: MatDialogRef<UserEditorDialog>,
              private store: Store<EvaluationModuleState>) {
  }

  set user(value: User) {
    console.log('$$$$$: ' + JSON.stringify(value));
    this._user = value;
    this.edit = true;
  }

  get user(): User {
    return this._user;
  }

  ngOnInit(): void {
    // this.edit = false;
    this.editorForm = this.formBuilder.group({
      name : [null, [Validators.required]],
      email : [null, [Validators.required]],
      realName : [null, [Validators.required]],
      password : [null, [Validators.required]],
    });
    if (this.edit) {
      this.editorForm.patchValue(this._user);
    }
  }

  update(user: User): void {
    this._user.name = user.name;
    this._user.email = user.email;
    this._user.realName = user.realName;
    this._user.password = user.password;
    this.store.dispatch(new UpdateUserAction(this._user));
    this.dialog.close();
  }
}
