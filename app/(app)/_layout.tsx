import * as React from 'react';
import {Redirect, Stack} from 'expo-router';
/**
 * ? Local & Shared Imports
 */
import {
	resetAppState,
	updateAppState,
	updateCurrentUser,
	useGlobalState,
} from '@lib/global-reducer';
import {
	FITFAMAPP,
	onAuthStateChanged,
	type userTypeProps,
	type userInfoType,
} from '@utils/firebase';

export const unstable_settings = {
	initialRouteName: '(tabs)',
};

export default function RootLayoutNav() {
	const {dispatch, state} = useGlobalState();

	const handleUpdateUser = React.useCallback(
		(user: userInfoType, currentUser: userTypeProps) => {
			updateAppState(dispatch, user);
			updateCurrentUser(dispatch, currentUser);
		},
		[dispatch]
	);

	React.useEffect(() => {
		onAuthStateChanged(FITFAMAPP, (user) => {
			if (user !== null) {
				const {providerData = []} = user ?? {};
				handleUpdateUser(providerData[0], user);
			} else {
				resetAppState(dispatch);
			}
		});
	}, [dispatch]);

	if (!state.isAuthenticated) {
		return <Redirect href='/sign-in' />;
	}

	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen name='(tabs)' />
			<Stack.Screen name='profile' />
			<Stack.Screen name='profile-update' options={{presentation: 'modal'}} />
			<Stack.Screen name='profile-edit' options={{presentation: 'modal'}} />
		</Stack>
	);
}
