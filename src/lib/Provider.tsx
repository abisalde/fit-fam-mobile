import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
/**
 * ? Local & Shared Imports
 */
import {LoadingFullScreen} from '@shared-components/loading-full-screen';

import {getStorageItemAsync} from '@local-storage';
import {AppReducer, GlobalStateContext, initialState} from './global-reducer';
import {ACTIONS} from './reducer-actions';

import {APP_GLOBAL_STATE} from '@shared-constants/app-config';

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
			<GestureHandlerRootView style={{flex: 1}}>
				<SafeAreaView style={{flex: 1}}>
					{loading ? <LoadingFullScreen /> : children}
				</SafeAreaView>
			</GestureHandlerRootView>
		</GlobalStateContext.Provider>
	);
};
