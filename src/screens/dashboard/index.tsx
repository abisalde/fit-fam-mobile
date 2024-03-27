import * as React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {router} from 'expo-router';

/**
 * ? Local & Shared Imports
 */
import {ProfileCard} from './components';
import {UpdateProfileCard} from '../profile/components';
import createStyles from './dashboard.styles';

import {Button} from '@shared-components/button';
import {Card} from '@shared-components/card';
import {Separator} from '@shared-components/separator';

import {resetAppState, useGlobalState} from '@lib/global-reducer';

import {useUserDetails} from '@hooks';

export const DashboardScreen = () => {
	const {dispatch} = useGlobalState();
	const {user, isLoading} = useUserDetails();

	const handleLogout = () => resetAppState(dispatch);

	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const navigateToProfileUpdate = (e: GestureResponderEvent) => {
		e.stopPropagation();
		router.navigate('/(app)/profile-update');
	};

	return (
		<View style={styles.root}>
			<ProfileCard loading={isLoading} user={user} />
			<Separator height={10} />
			<ScrollView
				style={styles.scrollRoot}
				contentContainerStyle={{}}
				horizontal={false}
				showsVerticalScrollIndicator={false}
			>
				<UpdateProfileCard onPress={navigateToProfileUpdate} user={user} />

				<Card style={styles.cardView}></Card>
				<Separator height={25} />
				<Button textLabel='logout' onPress={handleLogout} />
			</ScrollView>
		</View>
	);
};
