import {ExtendedTheme} from '@react-navigation/native';

import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
	root: ViewStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		root: {
			flex: 1,
			backgroundColor: colors.background,
			padding: 16,
		},
	});
};
