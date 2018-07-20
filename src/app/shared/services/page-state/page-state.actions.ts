import { Action } from '@ngrx/store';
import { PageState } from '../../../@core/data/app.states';

export const  SET = 'Set';
export const  RESET = 'Reset';

export class ResetAction implements Action {
  readonly type = RESET;
}

export class SetAction implements Action {
  readonly type = SET;

  constructor(public payload: PageState[]) {}
}

export type All = SetAction | ResetAction;  