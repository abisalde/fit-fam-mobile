import * as React from 'react';

import {View, StyleSheet} from 'react-native';
import {FormikHelpers} from 'formik';

import Ionicons from '@expo/vector-icons/Ionicons';
/**
 * ? Local & Imports
 */
import {
	FormContainer,
	FormField,
	PasswordField,
	SubmitButton,
} from '@shared-components/forms';
import {Separator} from '@shared-components/separator';

import {pixelSizeHorizontal} from '@utils/normalize';
import {RegisterFormType} from '@services/model';
import {RegisterFormSchema} from '@services/form-schemas';

import {palette} from '@app-theme';

const initialValues: RegisterFormType = {
	email: '',
	password: '',
	confirm_password: '',
};

type LoginFormProps = {
	onSubmit: (
		values: RegisterFormType,
		actions: FormikHelpers<RegisterFormType>
	) => Promise<void>;
};

export function RegisterForm({onSubmit}: LoginFormProps) {
	const [showPassword, setShowPassword] = React.useState<
		Record<string, boolean>
	>({
		password: false,
		confirm_password: false,
	});

	const updatePassword = (fieldId: string) => {
		setShowPassword({
			...showPassword,
			[fieldId]: !showPassword[fieldId],
		});
	};

	return (
		<View>
			<Separator height={29} />
			<FormContainer
				initialValues={initialValues}
				validationSchema={RegisterFormSchema}
				onSubmit={onSubmit}
			>
				<FormField
					field='email'
					placeholder='Enter your email'
					endEndornment={
						<Ionicons
							name='person-outline'
							size={25}
							color={palette.primary}
							style={styles.icon}
						/>
					}
				/>
				<Separator height={23} />
				<PasswordField
					placeholder='Enter your password'
					field='password'
					showPassword={showPassword}
					updatePassword={updatePassword}
				/>
				<Separator height={23} />
				<PasswordField
					placeholder='Confirm your password'
					field='confirm_password'
					showPassword={showPassword}
					updatePassword={updatePassword}
				/>
				<Separator height={26} />
				<SubmitButton textLabel='Submit' />
			</FormContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: pixelSizeHorizontal(15),
	},
});
