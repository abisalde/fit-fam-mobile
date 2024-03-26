import * as React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

/**
 * ? Local & Shared Imports
 */
import {ProfileCard} from './components';
import createStyles from './dashboard.styles';

import {Card} from '@shared-components/card';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {resetAppState, useGlobalState} from '@lib/global-reducer';
import {FontKeys} from '@utils/font-keys';
import {ExternalLink} from '@shared-components/ExternalLink';
import {Button} from '@shared-components/button';
import {router} from 'expo-router';

export const DashboardScreen = () => {
	const {state, dispatch} = useGlobalState();

	const handleLogout = () => resetAppState(dispatch);

	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const navigateToProfileUpdate = (e: GestureResponderEvent) => {
		e.stopPropagation();
		router.navigate('/(app)/profile-update');
	};

	return (
		<View style={{flex: 1, position: 'relative'}}>
			<ProfileCard />
			<Separator height={10} />
			<ScrollView
				style={styles.scrollRoot}
				contentContainerStyle={{}}
				horizontal={false}
				showsVerticalScrollIndicator={false}
			>
				<Card style={styles.profileUpdateCard}>
					<Text
						left
						color={colors.dark}
						fontFamily={FontKeys.DMSansSemiBold}
						h3
					>
						Update your profile
					</Text>
					<Separator height={16} />
					<Text
						center
						h2
						color={colors.primary}
						fontFamily={FontKeys.DMSansMedium}
					>
						Welcome to FITFAM Community 👋️
					</Text>
					<Separator height={10} />
					<Text center color={colors.grey3}>
						You can start by updating your profile
					</Text>
					<Separator height={18} />

					<Button
						onPress={navigateToProfileUpdate}
						accessibilityRole='button'
						accessibilityLabel='Navigate to update your profile'
						textLabel='Update now'
						textStyle={styles.textButtonStyle}
					/>
				</Card>

				<Button textLabel='logout' onPress={handleLogout} />
			</ScrollView>
		</View>
	);
};

// const styles = StyleSheet.create({
// 	root: {
// 		flex: 1,
// 		position: 'relative',
// 	},
// 	scrollRoot: {
// 		flex: 1,
// 		position: 'relative',
// 		zIndex: 20,
// 		width: '100%',
// 		margin: -40,
// 	},
// 	container: {
// 		paddingHorizontal: 16,
// 	},
// });
