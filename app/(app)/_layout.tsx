import * as React from 'react';
/**
 * ? Local & Shared Imports
 */
import {
	resetAppState,
	updateAppState,
	useGlobalState,
} from '@lib/global-reducer';
import {FITFAMAPP, onAuthStateChanged, userTypeProps} from '@utils/firebase';
import {Redirect, Stack} from 'expo-router';

export const unstable_settings = {
	initialRouteName: '(tabs)',
};

export default function RootLayoutNav() {
	const {dispatch, state} = useGlobalState();

	const handleUpdateUser = React.useCallback(
		(user: userTypeProps) => updateAppState(dispatch, user),
		[dispatch]
	);

	React.useEffect(() => {
		onAuthStateChanged(FITFAMAPP, (user) => {
			if (user !== null) {
				handleUpdateUser(user);
			} else {
				resetAppState(dispatch);
			}
		});
	}, [dispatch]);

	if (!state.isAuthenticated) {
		return <Redirect href='/sign-in' />;
	} else if (!state.User?.emailVerified) {
		return <Redirect href='/verify-email' />;
	}

	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen name='(tabs)' />
		</Stack>
	);
}
