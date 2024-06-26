import * as React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {router, useFocusEffect} from 'expo-router';

/**
 * ? Local & Shared Imports
 */
import {ProfileCard} from './components';
import {UpdateProfileCard} from '../profile/components';
import createStyles from './dashboard.styles';

import {Button} from '@shared-components/button';
import {Card} from '@shared-components/card';
import {Separator} from '@shared-components/separator';

import {useGlobalState} from '@lib/global-reducer';

import {useUserDetails} from '@hooks';
import {Text} from '@shared-components/text-wrapper';

export const DashboardScreen = () => {
	const {dispatch} = useGlobalState();
	const [{user, isLoading}, refresh] = useUserDetails();

	const theme = useTheme();
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const remount = React.useCallback(() => {
		refresh();
	}, []);

	useFocusEffect(remount);

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
				contentContainerStyle={styles.scrollContentView}
				horizontal={false}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={refresh} />
				}
			>
				<UpdateProfileCard
					onPress={navigateToProfileUpdate}
					user={user}
					loading={isLoading}
				/>

				<Card style={styles.cardView}>
					<Text left fontFamily='DMSansSemiBold' h3>
						Daily Goals
					</Text>
					<Separator height={22} />
					<View
						style={{
							width: '100%',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexDirection: 'row',
						}}
					>
						<View
							style={{
								width: 90,
								height: 90,
								borderWidth: 2,
								borderColor: 'violet',
								borderRadius: 45,
							}}
						></View>
						<View
							style={{
								width: 90,
								height: 90,
								borderWidth: 2,
								borderColor: 'violet',
								borderRadius: 45,
							}}
						></View>
						<View
							style={{
								width: 90,
								height: 90,
								borderWidth: 2,
								borderColor: 'violet',
								borderRadius: 45,
							}}
						></View>
					</View>
					<Separator height={20} />
				</Card>
				<Separator height={25} />
			</ScrollView>
		</View>
	);
};
