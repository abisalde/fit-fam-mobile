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

import {LoginFormType} from '@services/model';
import {LoginFormSchema} from '@services/form-schemas';
import {palette} from '@app-theme';
import {pixelSizeHorizontal} from '@utils/normalize';

const initialValues: LoginFormType = {
	email: '',
	password: '',
};

type LoginFormProps = {
	onSubmit: (
		values: LoginFormType,
		actions: FormikHelpers<LoginFormType>
	) => Promise<void>;
};

export function LoginForm({onSubmit}: LoginFormProps) {
	const [showPassword, setShowPassword] = React.useState<
		Record<string, boolean>
	>({
		password: false,
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
				validationSchema={LoginFormSchema}
				onSubmit={onSubmit}
			>
				<FormField
					placeholder='Enter your email'
					field='email'
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
