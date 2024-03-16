import * as React from 'react';
import {FormikHelpers} from 'formik';
import {
	sendEmailVerification,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import {router} from 'expo-router';
import {Alert} from 'react-native';
/**
 * ? Local & Shared Imports
 */
import {RegisterForm} from './form';

import {AuthScreenWrapper} from '@shared-components/auth-screen-wrapper';
import {RegisterFormType} from '@services/model';

import {FITFAMAPP} from '@utils/firebase';

export function RegisterScreen() {
	const submitForm = async (
		values: RegisterFormType,
		actions: FormikHelpers<RegisterFormType>
	) => {
		const {email, password} = values;

		try {
			const result = await createUserWithEmailAndPassword(
				FITFAMAPP,
				email,
				password
			);

			if (typeof result !== 'undefined') {
				const email = result.user.email ?? '';
				router.push({
					pathname: '/verify-email',
					params: {
						email,
					},
				});
				sendEmailVerification(result.user);
			}
		} catch (error: any) {
			const {message = ''} = error;
			Alert.alert(
				'Registration Error',
				typeof message === 'string' && message.length > 0
					? message
					: 'The email is already in use, Kindly try again with another email'
			);
			throw new Error(`${error}: Error from registering an account`);
		} finally {
			actions.setSubmitting(false);
			actions.resetForm();
		}
	};

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
