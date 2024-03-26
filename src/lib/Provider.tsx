import * as React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {LoadingFullScreen} from '@shared-components/loading-full-screen';

import {getStorageItemAsync} from '@local-storage';
import {
	AppReducer,
	GlobalStateContext,
	initialState,
	resetAppState,
} from './global-reducer';
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
					if (!storedState.isAuthenticated || storedState.User === undefined) {
						resetAppState(dispatch);
					} else {
						dispatch({type: ACTIONS.LOGIN_STATE, payload: storedState.User});
					}
				}
			} catch (error) {
				console.error('Error initializing app state from storage:', error);
			} finally {
				setLoading(false);
			}
		};

		initializeAppState();
	}, [dispatch]);

	return (
		<GlobalStateContext.Provider value={{state, dispatch}}>
			<GestureHandlerRootView style={styles.root}>
				{loading ? <LoadingFullScreen /> : children}
			</GestureHandlerRootView>
		</GlobalStateContext.Provider>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});
