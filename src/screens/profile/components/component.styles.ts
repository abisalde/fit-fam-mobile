import {ExtendedTheme} from '@react-navigation/native';

import {
	fontPixel,
	heightPixel,
	pixelSizeHorizontal,
	pixelSizeVertical,
} from '@utils/normalize';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	profileScreenHeader: ViewStyle;
	headerTitle: TextStyle;
	container: ViewStyle;
	empty: ViewStyle;
	textLabel: TextStyle;
	profileUpdateCard: ViewStyle;
	textButtonStyle: TextStyle;
	imageAvatarContainer: ViewStyle;
	imageAvatar: ImageStyle;
	navigateCardContainer: ViewStyle;
	navigateCardLeftContainer: ViewStyle;
	navigateCardIconContainer: ViewStyle;
	navigateCardRightContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			backgroundColor: colors.background,
			flex: 1,
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
		container: {
			paddingTop: heightPixel(20),
		},
		textLabel: {},
		profileUpdateCard: {
			padding: 20,
			width: '100%',
		},
		textButtonStyle: {
			textTransform: 'uppercase',
		},
		imageAvatarContainer: {
			justifyContent: 'center',
			alignItems: 'center',
			width: 150,
			height: 150,
			borderColor: colors.primary,
			borderRadius: 75,
			borderWidth: 3,
			overflow: 'hidden',
		},
		imageAvatar: {
			width: '100%',
			height: '100%',
			borderRadius: 75,
			borderWidth: 2,
			borderColor: colors.white,
		},
		navigateCardContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: '100%',
			marginBottom: pixelSizeVertical(30),
		},
		navigateCardLeftContainer: {
			alignItems: 'center',
			flexDirection: 'row',
		},
		navigateCardIconContainer: {
			width: 35,
			height: 35,
			borderRadius: 8,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: colors.purpleLight,
			marginRight: 10,
		},
		navigateCardRightContainer: {
			width: 35,
			height: 35,
			borderRadius: 20,
			backgroundColor: colors.grey5,
			justifyContent: 'center',
			alignItems: 'center',
			shadowColor: colors.dynamicBackground,
			shadowOpacity: 0.5,
			shadowRadius: 0.35,
			shadowOffset: {
				height: 0,
				width: 3,
			},
			elevation: 9,
		},
	});
};
