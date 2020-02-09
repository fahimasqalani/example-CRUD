import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Title} from '@angular/platform-browser';
import {User} from '../../shared/model/identity/user.interface';
import {IdentityService} from '../../../services/identity.service';
import {AdministrationModuleState, userSelector} from '../administration-reducers.module';
import {Store} from '@ngrx/store';
import {FindUserByUsernameAction, RemoveUserAction} from './user.action';
import {ChangeTitleAction} from '../../shared/shared.action';
import {RemoveCountryCodeAction} from "../country-codes/country-code.action";
import {TdDialogService} from "@covalent/core";
import {RemoveCompetencyCategoryAction} from "../../evaluation/competency-categories/competency-category.action";
import {GroupEditorDialog} from "../groups/group-editor.dialog";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {UserEditorDialog} from "./user-editor.dialog";

@Component({
  selector: 'cng-user-detail',
  templateUrl: './user-detail.page.html',
})
export class UserDetailPage implements OnInit {

  user$: Observable<User>;

  constructor(private route: ActivatedRoute,
              private vcf: ViewContainerRef,  private vcr: ViewContainerRef,
              private dialogService: TdDialogService,
              private dialog: MatDialog,
              private router: Router,
              private store: Store<AdministrationModuleState>) {
    this.user$ = this.store.select(userSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(new ChangeTitleAction({title: 'Users'}));
    this.route.params.subscribe((params: { username: string }) => {
      console.log('UserDetailPage: ' + params.username);
      this.store.dispatch(new FindUserByUsernameAction({username: params.username}));
    });
  }

  remove(user:User): void {
   const subscription = this.user$.subscribe(user => {
      // do your stuff in here
      console.log('user' + user.name);
      this.dialogService.openConfirm({
        message: 'Remove application ' + user.name,
        disableClose: false, // defaults to false
        viewContainerRef: this.vcf,
        cancelButton: 'No',
        acceptButton: 'Yes',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.store.dispatch(new RemoveUserAction(user));
          this.router.navigate(['/administration/users/list']);
          subscription.unsubscribe();
        } else {
        }
      });
    });
  }

  edit() {
    const config = new MatDialogConfig();
    // the of dialog
    config.viewContainerRef = this.vcr;
    config.role = 'dialog';
    config.width = '100%';
    config.height = '80%';
    config.position = {top: '0px'};
    const editorDialogRef = this.dialog.open(UserEditorDialog, config);
    const subscription = this.user$.subscribe(user => editorDialogRef.componentInstance.user = user);
    editorDialogRef.afterClosed().subscribe((res) => {
      this.router.navigate(['/administration/users/list']);
      subscription.unsubscribe();
    });
  }


  // remove(user): void {
  //   console.log('rowxxxx', user)
  //   this.dialogService.openConfirm({
  //     message: 'Remove application ' + user.realName,
  //     disableClose: false, // defaults to false
  //     viewContainerRef: this.vcf,
  //     cancelButton: 'No',
  //     acceptButton: 'Yes',
  //   }).afterClosed().subscribe((accept: boolean) => {
  //     if (accept) {
  //       this.store.dispatch(new RemoveUserAction(user));
  //       this.router.navigate(['/administration/users/list']);
  //     }
  //   });
  // }
}
