import {ExtendedTheme} from '@react-navigation/native';
import {
	pixelSizeHorizontal,
	pixelSizeVertical,
	scaledPixel,
} from '@utils/normalize';

import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	container: ViewStyle;
	title: TextStyle;
	subtitle: TextStyle;
	footer: ViewStyle;
	footerTop: ViewStyle;
	footerTopText: TextStyle;
	terms: TextStyle;
	logoFooter: ViewStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			flex: 1,
			justifyContent: 'center',
			paddingHorizontal: pixelSizeHorizontal(20),
			backgroundColor: colors.white,
		},
		container: {
			flex: 1,
			justifyContent: 'center',
			width: '100%',
		},
		title: {
			fontSize: scaledPixel(22),
			fontWeight: '600',
			lineHeight: pixelSizeVertical(30),
		},
		subtitle: {
			fontSize: scaledPixel(13),
			fontWeight: '400',
			lineHeight: pixelSizeVertical(19),
		},
		footer: {
			alignItems: 'center',
			marginTop: pixelSizeVertical(20),
		},
		footerTop: {
			alignItems: 'center',
			flexDirection: 'row',
			marginVertical: pixelSizeVertical(16),
		},
		footerTopText: {
			paddingLeft: pixelSizeHorizontal(6),
		},
		terms: {
			fontSize: scaledPixel(16),
			lineHeight: pixelSizeVertical(25),
		},
		logoFooter: {
			flex: 0,
			justifyContent: 'flex-end',
			alignItems: 'center',
			paddingBottom: pixelSizeVertical(22),
		},
	});
};
