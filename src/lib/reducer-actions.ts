import {userTypeProps} from '@utils/firebase';

export type AppState = {
	isAuthenticated: boolean;
	User: null | userTypeProps;
	last_updated: number;
};

export enum ACTIONS {
	UPDATE_USER = 'UPDATE_APP_USER',
	RESET_STATE = 'RESET_APP_STATE',
	LOGIN_STATE = 'LOGIN_APP_USER',
}

export type Action =
	| {
			type: ACTIONS.UPDATE_USER;
			payload: userTypeProps;
	  }
	| {type: ACTIONS.RESET_STATE}
	| {type: ACTIONS.LOGIN_STATE; payload: userTypeProps};
