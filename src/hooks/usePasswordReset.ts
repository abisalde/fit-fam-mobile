import * as React from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Alert} from 'react-native';

/**
 * > Local & Shared Imports
 */
import {resetAppState, useGlobalState} from '@lib/global-reducer';
import {FITFAMAPP, sendPasswordResetEmail} from '@utils/firebase';

/**
 *
 * @returns
 * @callback sendEmail
 * @callback passwordModal
 * @callback promptUserForPassword
 * @param { PasswordStateType }
 */

type PasswordStateType = {
	visible: boolean;
	loading: boolean;
};

type PromptUserPassword = {
	email: string;
	password: string;
};

const initialState: PasswordStateType = {
	visible: false,
	loading: false,
};

export const usePasswordReset = () => {
	const {dispatch} = useGlobalState();
	const [passwordResetState, setPasswordResetState] =
		React.useState<PasswordStateType>(initialState);

	// When the user clicks on YES sendEmail for Password Reset
	const sendEmail = React.useCallback(
		async (email: string) => {
			setPasswordResetState((prev) => ({...prev, loading: true}));
			try {
				await sendPasswordResetEmail(FITFAMAPP, email);

				Alert.alert(
					'Email sent successfully',
					'Please check your inbox/spam for a reset link',
					[
						{
							text: 'Login Again',
							onPress: () => resetAppState(dispatch),
						},
						{
							text: 'Cancel',
							style: 'cancel',
						},
					]
				);
			} catch (error) {
				if (error instanceof Error) {
					const errorMessage = error.message;
					Alert.alert('Password reset error', errorMessage);
				}
			} finally {
				setPasswordResetState(initialState);
			}
		},
		[dispatch]
	);

	const passwordModal = () =>
		setPasswordResetState((prev) => ({...prev, visible: !prev.visible}));

	// When the user clicks on No, we need their email and password
	const promptUserForPassword = async ({
		email,
		password,
	}: PromptUserPassword): Promise<boolean> => {
		try {
			await signInWithEmailAndPassword(FITFAMAPP, email, password);
			return true;
		} catch (error) {
			let errorMessage =
				'Unable to change your password now, please try again!';

			if (error instanceof Error) {
				const firebaseError = error.message;

				if (firebaseError.includes('auth/invalid-credential')) {
					errorMessage = 'Password is incorrect, please try again';
				} else if (firebaseError.includes('auth/too-many-requests')) {
					errorMessage =
						'Access to this account has been temporarily disabled, please try again.';
				}
				// Display an alert with the appropriate error message
				Alert.alert('Error Alert ❗', errorMessage);
			}
			return false;
		}
	};

	return {
		passwordModal,
		passwordResetState,
		promptUserForPassword,
		sendEmail,
	};
};
