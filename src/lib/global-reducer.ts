import * as React from 'react';

/**
 * ? Local & Shared Imports
 */
import {ACTIONS, Action, AppState} from './reducer-actions';

import {FITFAMAPP, signOut, type userTypeProps} from '@utils/firebase';

export const initialState: AppState = {
	isAuthenticated: false,
	User: null,
	last_updated: Date.now(),
};

export const GlobalStateContext = React.createContext<{
	state: AppState;
	dispatch: React.Dispatch<Action>;
}>({state: initialState, dispatch: () => initialState});

export const AppReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case ACTIONS.LOGIN_STATE:
			return {
				...state,
				User: action.payload,
				isAuthenticated: true,
				last_updated: Date.now(),
			};

		case ACTIONS.UPDATE_USER:
			return {
				...state,
				User: action.payload,
			};
		case ACTIONS.RESET_STATE:
			return initialState;

		default:
			return state;
	}
};

export const useGlobalState = () => React.useContext(GlobalStateContext);

export const updateAppState = (
	dispatch: React.Dispatch<Action>,
	user: userTypeProps
) => dispatch({type: ACTIONS.UPDATE_USER, payload: user});

export const resetAppState = (dispatch: React.Dispatch<Action>) => {
	dispatch({type: ACTIONS.RESET_STATE});
	signOut(FITFAMAPP);
};

export const loginUser = (
	dispatch: React.Dispatch<Action>,
	user: userTypeProps
) => dispatch({type: ACTIONS.LOGIN_STATE, payload: user});
