import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
/**
 * ? Local & Shared Imports
 */
import createStyles from './ScreenWrapper.styles';

import {ViewStyleProp} from '@types';

type ScreenWrapperProps = {
	style?: ViewStyleProp;
} & React.PropsWithChildren;

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
	children,
	style,
}) => {
	const theme = useTheme();
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	return <SafeAreaView style={[styles.root, style]}>{children}</SafeAreaView>;
};
