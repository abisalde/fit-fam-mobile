import * as React from 'react';
import {FormikHelpers} from 'formik';
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import {router} from 'expo-router';
import {Alert} from 'react-native';
/**
 * ? Local & Shared Imports
 */
import {LoginForm} from './form';

import {AuthScreenWrapper} from '@shared-components/auth-screen-wrapper';
import {LoginFormType} from '@services/model';
import {FITFAMAPP} from '@utils/firebase';

import {loginUser, useGlobalState} from '@lib/global-reducer';

export function LoginScreen() {
	const {dispatch} = useGlobalState();

	const submitForm = async (
		values: LoginFormType,
		actions: FormikHelpers<LoginFormType>
	) => {
		const {email, password} = values;

		try {
			const result = await signInWithEmailAndPassword(
				FITFAMAPP,
				email,
				password
			);

			if (!result.user?.emailVerified) {
				const email = result.user.email ?? '';
				router.push({
					pathname: '/verify-email',
					params: {
						email,
					},
				});
				sendEmailVerification(result.user);
				return; // Early return
			} else {
				loginUser(dispatch, result.user);
				router.navigate('/');
			}
		} catch (error: any) {
			const {message = ''} = error;
			Alert.alert(
				'Login Error',
				typeof message === 'string' && message.length > 0
					? message
					: "Check if you're logging in with the right credentials, Password/Email"
			);
			throw new Error(`${error}: Error from login into account`);
		} finally {
			actions.setSubmitting(false);
			actions.resetForm();
		}
	};

	return (
		<AuthScreenWrapper
			title='Login to account'
			subtitle='Welcome, login into your account to log your workout and have access to fitfam global community'
			screen='login'
			displayTerms={false}
		>
			<LoginForm onSubmit={submitForm} />
		</AuthScreenWrapper>
	);
}
