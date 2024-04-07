import {ExtendedTheme} from '@react-navigation/native';
import {pixelSizeVertical} from '@utils/normalize';

import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	container: ViewStyle;
	scrollRoot: ViewStyle;
	scrollContentView: ViewStyle;
	cardView: ViewStyle;
	textButtonStyle: TextStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			flex: 1,
			position: 'relative',
			backgroundColor: colors.background,
		},
		scrollRoot: {
			flex: 1,
			position: 'relative',
			zIndex: 20,
			width: '100%',
			marginTop: -85,
			paddingHorizontal: 16,
		},
		scrollContentView: {
			paddingBottom: pixelSizeVertical(25),
		},
		container: {
			backgroundColor: colors.background,
		},
		cardView: {
			padding: 20,
			width: '100%',
		},
		textButtonStyle: {
			textTransform: 'uppercase',
		},
	});
};
