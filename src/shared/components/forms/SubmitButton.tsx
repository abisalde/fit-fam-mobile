import * as React from 'react';
import {useFormikContext} from 'formik';

/**
 * ? Local Imports
 */
import {Button, type ButtonProps} from '@shared-components/button';
import {GestureResponderEvent} from 'react-native';

export const SubmitButton: React.FC<ButtonProps> = (props: ButtonProps) => {
	const {handleSubmit, isSubmitting, isValid, dirty} = useFormikContext();

	const handlePress = (e: GestureResponderEvent) => {
		e.preventDefault();
		handleSubmit();
	};

	return (
		<Button
			{...props}
			disabled={!(isValid && dirty)}
			loading={isSubmitting}
			onPress={handlePress}
		/>
	);
};
