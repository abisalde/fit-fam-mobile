import {ExtendedTheme} from '@react-navigation/native';

import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	backdropOverlay: ViewStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			backgroundColor: colors.transparent,
			...StyleSheet.absoluteFillObject,
			position: 'relative',
			flex: 1,
			zIndex: 0,
		},
		backdropOverlay: {
			...StyleSheet.absoluteFillObject,
			backgroundColor: colors.blackOverlay,
			zIndex: 1,
		},
	});
};
