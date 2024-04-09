import {ExtendedTheme} from '@react-navigation/native';
import {
	fontPixel,
	pixelSizeHorizontal,
	pixelSizeVertical,
} from '@utils/normalize';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	container: ViewStyle;
	innerContainer: ViewStyle;
	inputContainer: ViewStyle;
	inputFontStyle: TextStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			alignItems: 'center',
		},
		container: {
			justifyContent: 'center',
			borderWidth: 1,
			height: pixelSizeVertical(57),
			width: '100%',
			borderColor: colors.grey3,
			marginVertical: pixelSizeVertical(5),
			borderRadius: 8,
			backgroundColor: colors.transparent,
		},
		innerContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		inputContainer: {
			flexGrow: 1,
			paddingHorizontal: pixelSizeHorizontal(3),
		},
		inputFontStyle: {
			color: colors.black,
			fontSize: fontPixel(18),
			lineHeight: fontPixel(24),
			fontFamily: 'DMSansMedium',
			backgroundColor: colors.transparent,
			paddingLeft: pixelSizeHorizontal(8),
		},
	});
};
