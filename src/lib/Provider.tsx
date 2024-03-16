import * as React from 'react';

/**
 * ? Local & Shared Imports
 */
import {AppReducer, GlobalStateContext, initialState} from './global-reducer';
import {getStorageItemAsync} from '@local-storage';

import {APP_GLOBAL_STATE} from '@shared-constants/app-config';
import {ACTIONS} from './reducer-actions';
import {ActivityIndicator} from 'react-native';
import {palette} from '../shared/theme';
import {View} from 'react-native';

export const Provider = ({children}: React.PropsWithChildren) => {
	const [state, dispatch] = React.useReducer(AppReducer, initialState);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const initializeAppState = async () => {
			try {
				const storedStateJson = await getStorageItemAsync(APP_GLOBAL_STATE);

				const storedState = storedStateJson
					? JSON.parse(storedStateJson)
					: null;

				if (storedState) {
					dispatch({type: ACTIONS.LOGIN_STATE, payload: storedState.User});
				}
			} catch (error) {
				console.error('Error initializing app state from storage:', error);
			} finally {
				setLoading(false);
			}
		};

		initializeAppState();
	}, []);

	return (
		<GlobalStateContext.Provider value={{state, dispatch}}>
			{loading ? (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: palette.borderColor,
					}}
				>
					<ActivityIndicator animating color={palette.primary} size='large' />
				</View>
			) : (
				children
			)}
		</GlobalStateContext.Provider>
	);
};
