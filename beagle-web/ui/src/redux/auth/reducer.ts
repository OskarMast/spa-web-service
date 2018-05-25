import { AuthActions, Roles } from './types';
import { RootState } from '@redux/rootReducer';

const initialState: any = {
  userDetails: {
    name: null,
    role: Roles.USER,
    authorized: false,
  },
  error: '',
  loading: false,
}

export function authReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case AuthActions.SIGN_OUT:
    case AuthActions.SIGN_IN:
    case AuthActions.SIGN_UP: {
      return {
        ...state,
        loading: true,
        error: '',
      }
    }
    case AuthActions.SIGN_UP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      }
    }
    case AuthActions.SIGN_IN_SUCCESS: {
      const { userDetails } = action.payload;
      return {
        ...state,
        userDetails,
        loading: false,
        error: '',
      }
    }
    case AuthActions.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        ...initialState,
      }
    }
    case AuthActions.SIGN_OUT_FAILURE:
    case AuthActions.SIGN_IN_FAILURE:
    case AuthActions.SIGN_UP_FAILURE: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      }
    }
    default: return state;
  }

}

// selectors
export const getRole = (state: RootState) => state.auth.role;
export const getAuthorizedStatus = (state: RootState) => state.auth.authorized;
export const getUserDetails = (state: RootState) => state.auth.userDetails;
export const getError = (state: RootState) => state.auth.error;
export const getLoadingStatus = (state: RootState) => state.auth.loading;