import {ExtendedTheme} from '@react-navigation/native';

import {
	heightPixel,
	pixelSizeHorizontal,
	pixelSizeVertical,
} from '@utils/normalize';
import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

interface Style {
	avatarUploadRoot: ViewStyle;
	avatarContainer: ViewStyle;
	avatarPickerIcon: ViewStyle;
	avatarModalRoot: ViewStyle;
	avatarModalContainer: ViewStyle;
	avatar: ImageStyle;
	formContainerRoot: ViewStyle;
	formContentContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		avatarUploadRoot: {
			backgroundColor: colors.transparent,
			justifyContent: 'center',
			alignItems: 'center',
		},
		avatarContainer: {
			position: 'relative',
			justifyContent: 'center',
			alignItems: 'center',
			width: 150,
			height: 150,
			borderColor: colors.secondary,
			borderRadius: 75,
			backgroundColor: colors.white,
			borderWidth: 2,
		},
		avatarPickerIcon: {
			position: 'absolute',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: colors.secondary,
			bottom: 0,
			right: 0,
			height: 40,
			width: 40,
			borderRadius: 20,
			zIndex: 2,
		},
		avatarModalRoot: {
			justifyContent: 'flex-end',
		},
		avatarModalContainer: {
			backgroundColor: colors.white,
			zIndex: 10,
			borderTopLeftRadius: 25,
			borderTopRightRadius: 25,
			paddingHorizontal: pixelSizeHorizontal(16),
			paddingBottom: heightPixel(30),
		},
		avatar: {
			width: '100%',
			height: '100%',
			borderRadius: 100,
		},
		formContainerRoot: {
			flex: 1,
		},
		formContentContainer: {
			flex: 1,
			paddingBottom: pixelSizeVertical(30),
		},
	});
};
