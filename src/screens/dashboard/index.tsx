import {Button} from '@shared-components/button';
import {View} from 'react-native';

import {resetAppState, useGlobalState} from '@lib/global-reducer';

export const DashboardScreen = () => {
	const {state, dispatch} = useGlobalState();

	const handleLogout = () => resetAppState(dispatch);

	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<Button textLabel='Sign out' onPress={handleLogout} />
		</View>
	);
};
