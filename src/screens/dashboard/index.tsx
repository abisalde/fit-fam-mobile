import {Button} from '@shared-components/button';
import {View} from 'react-native';

import {resetAppState, useGlobalState} from '@lib/global-reducer';
import {AnimatedSpinner} from '@shared-components/animated-spinner';
import {palette} from '@app-theme';

export const DashboardScreen = () => {
	const {state, dispatch} = useGlobalState();

	const handleLogout = () => resetAppState(dispatch);

	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<Button textLabel='Sign out' onPress={handleLogout} />
			<AnimatedSpinner
				color={palette.secondary}
				radius={100}
				radiusWidth={10}
			/>
		</View>
	);
};
