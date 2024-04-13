import * as React from 'react';
import {type FormikHelpers} from 'formik';
import {View} from 'react-native';

/**
 *
 * ? Local & Shared Imports
 */

import {Separator} from '@shared-components/separator';

import {type NewPasswordType} from '@services/model';
import {NewPasswordFormSchema} from '@services/form-schemas';
import {
	FormContainer,
	PasswordField,
	SubmitButton,
} from '@shared-components/forms';

interface NewPasswordProps {
	onSubmit: (
		values: NewPasswordType,
		actions: FormikHelpers<NewPasswordType>
	) => Promise<void>;
}

const initialValues: NewPasswordType = {
	old_password: '',
	new_password: '',
	confirm_new_password: '',
};
export const NewPassword: React.FC<NewPasswordProps> = ({onSubmit}) => {
	const [showPassword, setShowPassword] = React.useState<
		Record<string, boolean>
	>({
		old_password: false,
		new_password: false,
		confirm_new_password: false,
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
				validationSchema={NewPasswordFormSchema}
				onSubmit={onSubmit}
			>
				<Separator height={23} />
				<PasswordField
					placeholder='Enter your old password'
					field='old_password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					returnKeyType='next'
				/>
				<Separator height={23} />
				<PasswordField
					placeholder='Enter your new password'
					field='new_password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					returnKeyType='next'
				/>
				<Separator height={23} />
				<PasswordField
					placeholder='Confirm your new password'
					field='confirm_new_password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					returnKeyType='done'
				/>
				<Separator height={26} />
				<SubmitButton textLabel='Submit' />
			</FormContainer>
		</View>
	);
};
