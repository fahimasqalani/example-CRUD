import {
  FIND_USER_BY_USERNAME_ERROR, FIND_USER_BY_USERNAME_SUCCESS,
  FindUserByUsernameAction, FindUserByUsernameSuccessAction
} from './user.action';
import {User} from '../../shared/model/identity/user.interface';
import {ApplicationError} from '../../shared/model/core/application-error.interface';

export interface UserState {
  user?: User;
  error?: ApplicationError;
  loading: boolean;
}

const initialState: UserState = {
  user: <User>{},
  loading: false,
  error: null
};

export function userReducer(state = initialState, action: FindUserByUsernameSuccessAction): UserState {
  switch (action.type) {
    case FIND_USER_BY_USERNAME_SUCCESS:
      return {
          user: action.payload,
          loading: false
      };
    default: {
      return state;
    }
  }
}

export const isLoadingUser = (state: UserState) => state.loading;
export const getUser = (state: UserState) => state.user;
