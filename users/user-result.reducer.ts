import {ApplicationError} from '../../shared/model/core/application-error.interface';
import {User} from '../../shared/model/identity/user.interface';
import {FIND_PAGED_USERS_SUCCESS, FindPagedUsersSuccessAction} from './user.action';

export interface UserResultState {
  users?: User[];
  totalSize: number;
  error?: ApplicationError;
  loading: boolean;
}

const initialState: UserResultState = {
  users: [],
  totalSize: 0,
  loading: false,
  error: null
};

export function userResultReducer(state = initialState, action: FindPagedUsersSuccessAction): UserResultState {
  switch (action.type) {
    case FIND_PAGED_USERS_SUCCESS:
      console.log('case: FIND_PAGED_USERS_SUCCESS');
      return {
        users: action.payload.data,
        totalSize: action.payload.totalSize,
        loading: false
      };
    default: {
      return state;
    }
  }
}

export const isLoadingUserResult = (state: UserResultState) => state.loading;
export const getUserResultData = (state: UserResultState) => state.users;
export const getUserResultTotalSize = (state: UserResultState) => state.totalSize;
