import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

/**
 * ? Local Imports
 */
import {Text} from '@shared-components/text-wrapper';
import {fontPixel} from '@utils/normalize';

interface IErrorMessageProps {
	error: string;
	visible?: boolean;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({error, visible}) => {
	const theme = useTheme();
	const {colors} = theme;

	if (!visible || !error) return null;
	return (
		<Text
			left
			h5
			color={colors.error}
			style={styles.textStyle}
			fontFamily='DMSansMedium'
		>
			{error}
		</Text>
	);
};

const styles = StyleSheet.create({
	textStyle: {
		fontSize: fontPixel(10),
		marginTop: 4,
		marginBottom: 6,
	},
});

export default ErrorMessage;
