import {FIND_USERS_SUCCESS, FindUsersSuccessAction} from './user.action';
import {User} from '../../shared/model/identity/user.interface';
import {ApplicationError} from '../../shared/model/core/application-error.interface';

export interface UserListState {
  users?: User[];
  error?: ApplicationError;
  loading: boolean;
}

const initialState: UserListState = {
  users: [],
  loading: false,
  error: null
};

export function userListReducer(state = initialState, action: FindUsersSuccessAction): UserListState {
  switch (action.type) {
    case FIND_USERS_SUCCESS:
      console.log('case: FIND_USERS_SUCCESS');
      return {
        users: action.payload,
        loading: false
      };
    default: {
      return state;
    }
  }
}

export const areLoadingUsers = (state: UserListState) => state.loading;
export const getUsers = (state: UserListState) => state.users;
