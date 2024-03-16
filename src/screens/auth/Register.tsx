import * as React from 'react';
import {FormikHelpers} from 'formik';
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
/**
 * ? Local & Shared Imports
 */
import {RegisterForm} from './form';

import {AuthScreenWrapper} from '@shared-components/auth-screen-wrapper';
import {RegisterFormType} from '@services/model';

export function RegisterScreen() {
	const submitForm = async (
		values: RegisterFormType,
		actions: FormikHelpers<RegisterFormType>
	) => {};

	return (
		<AuthScreenWrapper
			title='Create an account'
			subtitle='Create an account and have access to the biggest network of fitness
        lovers and goal getters around the world'
			screen='register'
		>
			<RegisterForm onSubmit={submitForm} />
		</AuthScreenWrapper>
	);
}
