import {Injectable} from '@angular/core';
import {
  FIND_PAGED_USERS,
  FIND_USER_BY_USERNAME,
  FIND_USERS,
  FindPagedUsersAction,
  FindPagedUsersSuccessAction,
  FindUserByUsernameAction,
  FindUserByUsernameSuccessAction,
  FindUsersAction,
  FindUsersSuccessAction,
  REMOVE_USER,
  RemoveUserAction,
  RemoveUserSuccessAction,
  SAVE_USER,
  SaveUserAction,
  SaveUserSuccessAction,
  UPDATE_USER,
  UpdateUserAction,
  UpdateUserSuccessAction
} from './user.action';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {from} from 'rxjs/observable/from';
import {IdentityService} from '../../../services/identity.service';
import {Router} from "@angular/router";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private identityService: IdentityService,
              private router: Router ) {
  }

  @Effect()
  public findPagedUsers$: Observable<Action> = this.actions$
    .ofType(FIND_PAGED_USERS)
    .map((action: FindPagedUsersAction) => action.payload)
    .switchMap(payload => this.identityService.findPagedUsers(payload.page))
    .map(users => new FindPagedUsersSuccessAction(users));

  @Effect()
  public findUsers$: Observable<Action> = this.actions$
    .ofType(FIND_USERS)
    .map((action: FindUsersAction) => action.payload)
    .switchMap(payload => this.identityService.findUsers())
    .map(users => new FindUsersSuccessAction(users));

  @Effect()
  public findUserByUsername$: Observable<Action> = this.actions$
    .ofType(FIND_USER_BY_USERNAME)
    .map((action: FindUserByUsernameAction) => action.payload)
    .switchMap(payload => this.identityService.findUserByUsername(payload.username))
    .map(user => new FindUserByUsernameSuccessAction(user));

  @Effect() saveUser$ = this.actions$
    .ofType(SAVE_USER)
    .map((action: SaveUserAction) => action.payload)
    .switchMap((user) => this.identityService.saveUser(user))
    .map((message) => new SaveUserSuccessAction({message: 'success'}))
    .mergeMap((action) => from([action, new FindPagedUsersAction({filter: 'todo', page: 1})]));

  @Effect() updateUser$ = this.actions$
    .ofType(UPDATE_USER)
    .map((action: UpdateUserAction) => action.payload)
    .switchMap((user) => this.identityService.updateUser(user))
    .map((user) => new UpdateUserSuccessAction({message: 'success'}))
    .switchMap(() => this.identityService.findUsers())
    .map((users) => new FindUsersAction({filter: 'todo'}));

  @Effect() removeUser$ = this.actions$
    .ofType(REMOVE_USER)
    .map((action: RemoveUserAction) => action.payload)
    .switchMap(payload => this.identityService.removeUser(payload))
    .map(message => new RemoveUserSuccessAction({message: 'success'}))
    .mergeMap(action => from([action, new FindUsersAction({filter: 'todo'})]))
    //.do(action => this.router.navigate([ '/administration/users/list']));
}
