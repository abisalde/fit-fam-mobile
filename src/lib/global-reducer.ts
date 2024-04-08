import * as React from 'react';

/**
 * ? Local & Shared Imports
 */
import {ACTIONS, Action, AppState} from './reducer-actions';

import {
	FITFAMAPP,
	signOut,
	userTypeProps,
	type userInfoType,
} from '@utils/firebase';
import {APP_GLOBAL_STATE} from '@shared-constants/app-config';
import {setStorageItemAsync} from '@local-storage';

export const initialState: AppState = {
	isAuthenticated: false,
	User: null,
	last_updated: Date.now(),
	currentUser: null,
	seenOnboarding: false,
};

export const GlobalStateContext = React.createContext<{
	state: AppState;
	dispatch: React.Dispatch<Action>;
}>({state: initialState, dispatch: () => initialState});

export const AppReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case ACTIONS.LOGIN_STATE:
			return updateAppStateAndStorage(state, {
				User: action.payload,
				isAuthenticated: true,
				last_updated: Date.now(),
			});

		case ACTIONS.UPDATE_USER:
			return updateAppStateAndStorage(state, {
				User: action.payload,
			});

		case ACTIONS.RESET_STATE:
			return {
				...state,
				User: null,
				currentUser: null,
				last_updated: Date.now(),
				isAuthenticated: false,
			};

		case ACTIONS.CURRENT_USER:
			const currentUser = action.payload;
			return {
				...state,
				currentUser,
			};

		case ACTIONS.SEEN_ONBOARDING:
			return updateAppStateAndStorage(state, {
				seenOnboarding: action.payload,
				last_updated: Date.now(),
			});

		default:
			return state;
	}
};

export const useGlobalState = () => React.useContext(GlobalStateContext);

export const updateAppState = (
	dispatch: React.Dispatch<Action>,
	user: userInfoType
) => dispatch({type: ACTIONS.UPDATE_USER, payload: user});

export const resetAppState = (dispatch: React.Dispatch<Action>) => {
	dispatch({type: ACTIONS.RESET_STATE});
	signOut(FITFAMAPP);
};

export const loginUser = (
	dispatch: React.Dispatch<Action>,
	user: userInfoType
) => dispatch({type: ACTIONS.LOGIN_STATE, payload: user});

export const updateCurrentUser = (
	dispatch: React.Dispatch<Action>,
	user: userTypeProps
) => dispatch({type: ACTIONS.CURRENT_USER, payload: user});

export const updateUserOnboarding = (
	dispatch: React.Dispatch<Action>,
	status: boolean
) => dispatch({type: ACTIONS.SEEN_ONBOARDING, payload: status});

const updateAppStateAndStorage = (
	state: AppState,
	newState: Partial<AppState>
): AppState => {
	const updatedState = {...state, ...newState};

	if (updatedState.currentUser) {
		const {currentUser, ...rest} = updatedState;
		setStorageItemAsync(APP_GLOBAL_STATE, JSON.stringify(rest));
	} else {
		setStorageItemAsync(APP_GLOBAL_STATE, JSON.stringify(updatedState));
	}
	return updatedState;
};
