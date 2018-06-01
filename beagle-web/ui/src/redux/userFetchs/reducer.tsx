import { TableActions } from '@redux/common/table/types';
import { UserFetchsActions, UserFetchsState } from './types';
import { RootState } from '@redux/rootReducer';

export const initialState: UserFetchsState = {
  fetches: [],
  sampleUrls: {},
  resultUrls: [],
  loading: false,
}

export function userFetchsReducer(state: UserFetchsState = initialState, action: any) {
  switch (action.type) {
    case TableActions.LOAD_DATA_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        fetches: data,
      }
    }
    case UserFetchsActions.REMOVE_FETCH:
    case UserFetchsActions.ADD_NEW_FETCH_FOR_EXPLORE: {
      return {
        ...state,
        loading: true,
      }
    }
    case UserFetchsActions.SAVE_EXPLORED_FETCH_SAMPLES: {
      const {
        exploredFetchWithSamples: {
          key,
          url,
          meta,
          sampleUrls,
        }
      } = action.payload;

      return {
        ...state,
        fetches: state.fetches.concat({ key, url, meta }),
        sampleUrls: {
          ...state.sampleUrls,
          [key]: sampleUrls,
        },
        loading: false,
      }
    }
    case UserFetchsActions.SAVE_FETCH_RESULTS: {
      const { fetchResults } = action.payload;
      return {
        ...state,
        resultUrls: state.resultUrls.concat(...fetchResults),
      }
    }
    case UserFetchsActions.REMOVE_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }
    default: return state;
  }
}

// selectors
export const getUserFetchs = (state: RootState) => state.userFetchs.fetches;
export const getFetchSampleUrls = (state: RootState) => state.userFetchs.sampleUrls;
export const getResultUrls = (state: RootState) => state.userFetchs.resultUrls;
export const getLoadingStatus = (state: RootState) => state.userFetchs.loading;