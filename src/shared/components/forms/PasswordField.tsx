import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';

/**
 *
 * ? Local & Shared Imports
 */
import {FormField, type FormFieldProps} from './FormField';

import {palette} from '@app-theme';
import {pixelSizeHorizontal} from '@utils/normalize';

export type PasswordFieldProps = {
	showPassword: Record<string, boolean>;
	updatePassword: (fieldId: string) => void;
} & FormFieldProps;

export const PasswordField: React.FC<PasswordFieldProps> = ({
	field,
	showPassword,
	updatePassword,
	...rest
}) => {
	const handlePressIn = (e: GestureResponderEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<FormField
			field={field}
			secureTextEntry={showPassword[field] ? false : true}
			endEndornment={
				<>
					<Pressable
						onPress={() => {
							updatePassword(field);
						}}
						onPressIn={handlePressIn}
					>
						<Ionicons
							name={showPassword[field] ? 'eye-off-outline' : 'eye-outline'}
							size={28}
							color={palette.primary}
							style={styles.icon}
						/>
					</Pressable>
				</>
			}
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: pixelSizeHorizontal(15),
	},
});
