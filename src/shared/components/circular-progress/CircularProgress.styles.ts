import {ExtendedTheme} from '@react-navigation/native';
import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
	children: ViewStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			alignItems: 'center',
			backgroundColor: colors.transparent,
		},
		children: {
			position: 'absolute',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
		},
	});
};
