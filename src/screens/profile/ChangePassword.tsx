import * as React from 'react';

import {type FormikHelpers} from 'formik';
import {Alert} from 'react-native';
import {router} from 'expo-router';
/**
 * ? Local & Shared Imports
 */
import {NewPassword, ProfileScreenLayout} from './components';

import {usePasswordReset} from '@hooks';
import {useGlobalState} from '@lib/global-reducer';
import {updatePassword} from '@utils/firebase';
import {type NewPasswordType} from '@services/model';

export const ChangePasswordScreen: React.FC = () => {
	const {promptUserForPassword} = usePasswordReset();
	const {state} = useGlobalState();

	const onFormSubmit = React.useCallback(
		async (
			values: NewPasswordType,
			actions: FormikHelpers<NewPasswordType>
		) => {
			if (!state.currentUser) return;
			const currentUser = state.currentUser;
			const email = state.currentUser?.email ?? '';
			const {old_password, new_password} = values;
			try {
				const res = await promptUserForPassword({
					email,
					password: old_password,
				});

				if (res) {
					await updatePassword(currentUser, new_password);

					Alert.alert(
						'Password updated successfully',
						'Press OK to be redirected',
						[
							{
								text: 'OK',
								onPress: () => router.push('../'),
							},
						]
					);
				}
			} catch (error) {
				if (error instanceof Error) {
					const errorMessage = error.message;
					Alert.alert('Password reset error', errorMessage);
				}
			} finally {
				actions.resetForm();
				actions.setSubmitting(false);
			}
		},
		[state.currentUser]
	);

	return (
		<ProfileScreenLayout headerTitle='Change Password'>
			<NewPassword onSubmit={onFormSubmit} />
		</ProfileScreenLayout>
	);
};
