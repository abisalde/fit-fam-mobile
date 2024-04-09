import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {
	View,
	TextInput as RNInput,
	TextInputProps as RNInputProps,
} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import createStyles from './Input.styles';

import type {TextStyleProp, ViewStyleProp} from '@types';

export type InputProps = {
	error?: string;
	endEndornment?: React.ReactNode;
	touched?: boolean;
	startEndornment?: React.ReactNode;
	style?: ViewStyleProp;
	inputStyle?: TextStyleProp;
	borderError?: boolean;
} & RNInputProps;

export const Input: React.FC<InputProps> = ({
	borderError,
	error,
	endEndornment,
	startEndornment,
	style,
	touched,
	inputStyle,
	...props
}) => {
	const theme = useTheme();

	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const borderColor = React.useMemo(() => {
		if (touched && borderError) {
			return colors.error;
		}
		if (touched) {
			return colors.primary;
		}
		return colors.grey3;
	}, [error, touched]);

	return (
		<View style={styles.root}>
			<View style={[styles.container, style, {borderColor}]}>
				<View style={styles.innerContainer}>
					{startEndornment}
					<View style={styles.inputContainer}>
						<RNInput
							{...props}
							underlineColorAndroid='transparent'
							textAlign='left'
							placeholderTextColor={colors.textPlaceholder}
							style={[styles.inputFontStyle, inputStyle]}
							numberOfLines={1}
						/>
					</View>
					{endEndornment}
				</View>
			</View>
		</View>
	);
};
