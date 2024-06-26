import * as React from 'react';
import {query, where, getDocs} from 'firebase/firestore';
/**
 * ? Local & Shared Imports
 */
import {database, DBCollection} from '@utils/firebase';

import {COLLECTIONS_NAME} from '@types';

/**
 *
 * @returns
 *  @callback searchUsername
 * @param { SearchStateOptions }
 */

type SearchStateOptions = {
	error: string;
	isValid: boolean;
};

const message = 'Username already exist, please try with a new one';

const initialState: SearchStateOptions = {
	error: '',
	isValid: false,
};

export const useUsernameSearch = () => {
	const [searchOptions, setSearchOptions] =
		React.useState<SearchStateOptions>(initialState);

	const searchUsername = React.useCallback(
		async (val: string): Promise<boolean> => {
			const text = val.trim().toLowerCase();
			try {
				const docQuery = query(
					DBCollection(database, COLLECTIONS_NAME.USERNAMES),
					where('username', '==', text)
				);

				const querySnapshot = await getDocs(docQuery);
				const usernameExist = !querySnapshot.empty;

				if (usernameExist) {
					setSearchOptions((prev) => ({...prev, error: message}));
					return false;
				} else {
					setSearchOptions({error: '', isValid: true});
					return true;
				}
			} catch (error) {
				console.log('Error', error);
				return false;
			}
		},
		[]
	);

	return {
		searchOptions,
		searchUsername,
		setSearchOptions,
	};
};
