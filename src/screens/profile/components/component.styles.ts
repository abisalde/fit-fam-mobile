import {ExtendedTheme} from '@react-navigation/native';

import {fontPixel, pixelSizeHorizontal} from '@utils/normalize';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	profileScreenHeader: ViewStyle;
	headerTitle: TextStyle;
	container: ViewStyle;
	empty: ViewStyle;
	textLabel: TextStyle;
	profileUpdateCard: ViewStyle;
	textButtonStyle: TextStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			backgroundColor: colors.background,
		},
		profileScreenHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: '100%',
		},
		headerTitle: {
			fontSize: fontPixel(20),
		},
		empty: {
			width: pixelSizeHorizontal(55),
		},
		container: {},
		textLabel: {},
		profileUpdateCard: {
			padding: 20,
			width: '100%',
		},
		textButtonStyle: {
			textTransform: 'uppercase',
		},
	});
};
