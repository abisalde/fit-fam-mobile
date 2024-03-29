import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {router} from 'expo-router';

import {GestureResponderEvent, View} from 'react-native';
/**
 * ? Local & Shared Imports
 */
import createStyles from './component.styles';

import {BackButton} from '@shared-components/BackButton';
import {ScreenWrapper} from '@shared-components/screen-wrapper';
import {Text} from '@shared-components/text-wrapper';

import {FontKeys} from '@utils/font-keys';

interface ProfileScreenLayoutProps {
	headerTitle: string;
}

export const ProfileScreenLayout: React.FC<
	ProfileScreenLayoutProps & React.PropsWithChildren
> = ({children, headerTitle}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const goBack = React.useCallback(
		(e: GestureResponderEvent) => {
			e.stopPropagation();
			router.back();
		},
		[router]
	);

	return (
		<ScreenWrapper style={styles.root}>
			<View style={styles.profileScreenHeader}>
				<BackButton onPress={goBack} />
				<Text
					style={styles.headerTitle}
					color={colors.dark}
					fontFamily={FontKeys.DMSansSemiBold}
					center
				>
					{headerTitle}
				</Text>
				<View style={styles.empty} />
			</View>
			{children}
		</ScreenWrapper>
	);
};
