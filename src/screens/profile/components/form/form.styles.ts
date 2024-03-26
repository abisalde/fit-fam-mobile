import {ExtendedTheme} from '@react-navigation/native';

import {fontPixel, heightPixel, pixelSizeHorizontal} from '@utils/normalize';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
	avatarUploadRoot: ViewStyle;
	avatarContainer: ViewStyle;
	avatarPickerIcon: ViewStyle;
	avatarModalRoot: ViewStyle;
	avatarModalContainer: ViewStyle;
	avatar: ImageStyle;
	uploadButton: ViewStyle;
	headerTitle: TextStyle;
	empty: ViewStyle;
	textLabel: TextStyle;
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
			backgroundColor: colors.grey5,
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
		uploadButton: {
			backgroundColor: colors.success,
		},
		avatar: {
			width: '100%',
			height: '100%',
			borderRadius: 100,
		},
		headerTitle: {
			fontSize: fontPixel(20),
		},
		empty: {
			width: pixelSizeHorizontal(55),
		},
		container: {},
		textLabel: {},
	});
};
