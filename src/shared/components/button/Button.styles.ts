import {ExtendedTheme} from '@react-navigation/native';

import {fontPixel, pixelSizeVertical} from '@utils/normalize';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	container: ViewStyle;
	textLabel: TextStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			alignItems: 'center',
		},
		container: {
			justifyContent: 'center',
			alignItems: 'center',
			height: pixelSizeVertical(57),
			width: '100%',
			borderRadius: 8,
			backgroundColor: colors.transparent,
		},
		textLabel: {
			fontSize: fontPixel(18),
			fontWeight: '600',
			lineHeight: fontPixel(22),
		},
	});
};
