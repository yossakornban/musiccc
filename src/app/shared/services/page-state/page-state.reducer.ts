
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from './page-state.actions';
import { PageStates, RESET_PAGE_STATES } from '../../../@core/data/app.states';

export const initialState: PageStates = { pageStates: [] };

export function reducer(state = initialState, action: fromActions.All): PageStates {
  switch (action.type) {
    case fromActions.RESET: {
      return { pageStates: RESET_PAGE_STATES };
    }
    case fromActions.SET: {
      return { pageStates: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getPageState = createFeatureSelector<PageStates>('appState');

export function getStates(page: string){
  const getStates = createSelector(
    getPageState,
    (state: PageStates) => state.pageStates.filter(item => item.page === page)
  );
  return getStates;
}