import * as React from 'react';

/**
 * ? Local & Shared Imports
 */
import {AppReducer, GlobalStateContext, initialState} from './global-reducer';

export const Provider = ({children}: React.PropsWithChildren) => {
	const [state, dispatch] = React.useReducer(AppReducer, initialState);

	return (
		<GlobalStateContext.Provider value={{state, dispatch}}>
			{children}
		</GlobalStateContext.Provider>
	);
};
