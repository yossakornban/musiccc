export interface AppState {
	appState: PageStates;
}

export interface PageStates {
	pageStates: PageState[];
}

export interface PageState {
	page: string
	states: State[];
}

export interface State {
    key: string;
    value: string;
}

export const RESET_STATES: State[] = [];

export const RESET_PAGE_STATES: PageState[] = [];