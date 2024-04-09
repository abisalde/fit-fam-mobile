import type {userTypeProps, userInfoType} from '@utils/firebase';

export type AppState = {
	currentUser: null | userTypeProps;
	isAuthenticated: boolean;
	User: null | userInfoType;
	last_updated: number;
	seenOnboarding: boolean;
};

export enum ACTIONS {
	UPDATE_USER = 'UPDATE_APP_USER',
	RESET_STATE = 'RESET_APP_STATE',
	LOGIN_STATE = 'LOGIN_APP_USER',
	CURRENT_USER = 'CURRENT_USER',
	SEEN_ONBOARDING = 'USER_SEEN_ONBOARDING',
	RESET_APP = 'RESET_APP',
}

export type Action =
	| {
			type: ACTIONS.UPDATE_USER;
			payload: userInfoType;
	  }
	| {type: ACTIONS.RESET_STATE}
	| {type: ACTIONS.LOGIN_STATE; payload: userInfoType}
	| {type: ACTIONS.CURRENT_USER; payload: userTypeProps}
	| {type: ACTIONS.SEEN_ONBOARDING; payload: boolean}
	| {type: ACTIONS.RESET_APP};
