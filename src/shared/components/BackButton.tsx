import * as React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {ColorValue, PressableProps, StyleSheet} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {RNBounce} from './button';
import {palette} from '@app-theme';

interface BackButtonProps extends PressableProps {
	bgColor?: ColorValue;
}

export const BackButton: React.FC<BackButtonProps> = ({
	bgColor = '#fff',
	onPress,
	...rest
}) => {
	return (
		<RNBounce
			{...rest}
			accessibilityLabel='Navigate back'
			accessibilityRole='button'
			style={[styles.container, {backgroundColor: bgColor}]}
			onPress={onPress}
		>
			<FontAwesome6 name='arrow-left-long' size={24} color={palette.primary} />
		</RNBounce>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		shadowColor: palette.blackOverlay,
		shadowOffset: {
			height: 0,
			width: -2,
		},
		shadowOpacity: 0.55,
		shadowRadius: 0.4,
		elevation: 5,
	},
});
