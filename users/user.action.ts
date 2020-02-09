import {Action} from '@ngrx/store';
import {ApplicationError} from '../../shared/model/core/application-error.interface';
import {User} from '../../shared/model/identity/user.interface';
import {UserResult} from '../../shared/model/identity/user-result.interface';

export const FIND_PAGED_USERS = '[User] Find Paged Users';
export const FIND_PAGED_USERS_SUCCESS = '[User] Find Paged Users Success';
export const FIND_PAGED_USERS_ERROR = '[User] Find Paged Users Error';
export const FIND_USERS = '[User] Find Users';
export const FIND_USERS_SUCCESS = '[User] Find Users Success';
export const FIND_USERS_ERROR = '[User] Find Users Error';
export const FIND_USER_BY_USERNAME = '[User] Find User By Username';
export const FIND_USER_BY_USERNAME_SUCCESS = '[User] Find User By Username Success';
export const FIND_USER_BY_USERNAME_ERROR = '[User] Find User By Username Error';
export const SAVE_USER = '[User] Save User';
export const SAVE_USER_SUCCESS = '[User] Save User Success';
export const SAVE_USER_ERROR = '[User] Save User Error';
export const UPDATE_USER = '[User] Update User';
export const UPDATE_USER_SUCCESS = '[User] Update User Success';
export const UPDATE_USER_ERROR = '[User] Update User Error';
export const REMOVE_USER = '[User] Remove User';
export const REMOVE_USER_SUCCESS = '[User] Remove User Success';
export const REMOVE_USER_ERROR = '[User] Remove User Error';

export class FindPagedUsersAction implements Action {
  readonly type: string = FIND_PAGED_USERS;

  constructor(public payload: { filter: string, page: number }) {
    console.log('FindUsersAction');
  }
}

export class FindPagedUsersSuccessAction implements Action {
  readonly type: string = FIND_PAGED_USERS_SUCCESS;

  constructor(public payload: UserResult) {
    console.log('FindUsersSuccessAction');
  }
}

export class FindPagedUsersErrorAction implements Action {
  readonly type: string = FIND_PAGED_USERS_ERROR;

  constructor(public payload: ApplicationError) {
  }
}

export class FindUsersAction implements Action {
  readonly type: string = FIND_USERS;

  constructor(public payload: { filter: string }) {
    console.log('FindUsersAction');
  }
}

export class FindUsersSuccessAction implements Action {
  readonly type: string = FIND_USERS_SUCCESS;

  constructor(public payload: User[]) {
    console.log('FindUsersSuccessAction');
  }
}

export class FindUsersErrorAction implements Action {
  readonly type: string = FIND_USERS_ERROR;

  constructor(public payload: ApplicationError) {
  }
}

export class FindUserByUsernameAction implements Action {
  readonly type: string = FIND_USER_BY_USERNAME;

  constructor(public payload: { username: string }) {
  }
}

export class FindUserByUsernameSuccessAction implements Action {
  readonly type: string = FIND_USER_BY_USERNAME_SUCCESS;

  constructor(public payload: User) {
  }
}

export class FindUserByUsernameErrorAction implements Action {
  readonly type: string = FIND_USER_BY_USERNAME_ERROR;

  constructor(public payload: ApplicationError) {
  }
}

export class SaveUserAction implements Action {
  readonly type: string = SAVE_USER;

  constructor(public payload: User) {
  }
}

export class SaveUserSuccessAction implements Action {
  readonly type: string = SAVE_USER_SUCCESS;

  constructor(public payload: { message: string }) {
  }
}

export class SaveUserErrorAction implements Action {
  readonly type: string = SAVE_USER_ERROR;

  constructor(public payload: ApplicationError) {
  }
}

export class UpdateUserAction implements Action {
  readonly type: string = UPDATE_USER;

  constructor(public payload: User) {
  }
}

export class UpdateUserSuccessAction implements Action {
  readonly type: string = UPDATE_USER_SUCCESS;

  constructor(public payload: { message: string }) {
  }
}

export class UpdateUserErrorAction implements Action {
  readonly type: string = UPDATE_USER_ERROR;

  constructor(public payload: ApplicationError) {
  }
}

export class RemoveUserAction implements Action {
  readonly type: string = REMOVE_USER;

  constructor(public payload: User) {
    console.log('remove ');
  }
}

export class RemoveUserSuccessAction implements Action {
  readonly type: string = REMOVE_USER_SUCCESS;

  constructor(public payload: { message: string }) {
  }
}

export class RemoveUserErrorAction implements Action {
  readonly type: string = REMOVE_USER_ERROR;

  constructor(public payload: ApplicationError) {
  }
}
