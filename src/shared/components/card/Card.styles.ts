import {ExtendedTheme} from '@react-navigation/native';

import {StyleSheet, ViewStyle} from 'react-native';

interface Style {
	card: ViewStyle;
}

export default (theme: ExtendedTheme) => {
	const {colors} = theme;
	return StyleSheet.create<Style>({
		card: {
			backgroundColor: colors.white,
			padding: 15,
			borderRadius: 20,
			shadowColor: 'rgba(0,0,0,0.1)',
			shadowRadius: 0.3,
			shadowOpacity: 0.45,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			elevation: 8,
		},
	});
};
