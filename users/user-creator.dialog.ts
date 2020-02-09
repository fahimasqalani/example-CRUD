import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {AdministrationModuleState} from '../administration-reducers.module';
import {Store} from '@ngrx/store';
import {SaveUserAction} from './user.action';
import {ActorType} from '../../shared/model/identity/actor-type.enum';
import {User} from '../../shared/model/identity/user.interface';

@Component({
  selector: 'cng-user-creator',
  templateUrl: './user-creator.dialog.html',
})

export class UserCreatorDialog implements OnInit {

  creatorForm: FormGroup;
  edit: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialog: MatDialogRef<UserCreatorDialog>,
              private store: Store<AdministrationModuleState>) {

    this.creatorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      realName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit(user: User) {
    console.log(JSON.stringify(user));
    this.store.dispatch(new SaveUserAction(user));
    this.dialog.close();
  }
}
