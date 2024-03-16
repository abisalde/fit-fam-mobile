import * as React from 'react';
import {FormikHelpers} from 'formik';
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
/**
 * ? Local & Shared Imports
 */
import {LoginForm} from './form';

import {AuthScreenWrapper} from '@shared-components/auth-screen-wrapper';
import {LoginFormType} from '@services/model';

export function LoginScreen() {
	const submitForm = async (
		values: LoginFormType,
		actions: FormikHelpers<LoginFormType>
	) => {};

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
