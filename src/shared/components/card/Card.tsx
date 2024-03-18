import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import createStyles from './Card.styles';

import type {ViewStyleProp} from '@types';

type CardProps = {
	style?: ViewStyleProp;
} & React.PropsWithChildren;

export const Card: React.FC<CardProps> = ({children, style}) => {
	const theme = useTheme();
	const styles = React.useMemo(() => createStyles(theme), [theme]);
	return (
		<View
			accessibilityRole='none'
			accessibilityLabel='Card Overlay'
			style={[styles.card, style]}
		>
			{children}
		</View>
	);
};
