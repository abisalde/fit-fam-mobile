import * as React from 'react';
import {query, where, getDocs} from 'firebase/firestore';

/**
 * > Local & Shared Imports
 */
import {useGlobalState} from '@lib/global-reducer';
import {COLLECTIONS_NAME, type UserCollectionType} from '@types';
import {database, DBCollection} from '@utils/firebase';

/**
 *
 * @returns
 * @callback fetchUser
 * @param { UserCollectionStateType }
 */

type UserCollectionStateType = {
	isLoading: boolean;
	user: UserCollectionType | undefined;
};

export const useUserDetails = (): [UserCollectionStateType, () => void] => {
	const {state} = useGlobalState();
	const [userOption, setUserOption] = React.useState<UserCollectionStateType>({
		isLoading: true,
		user: undefined,
	});

	const fetchUser = async () => {
		try {
			const getData = query(
				DBCollection(database, COLLECTIONS_NAME.USERS),
				where('user_id', '==', state.currentUser?.uid)
			);

			const querySnapShot = await getDocs(getData);
			const userData = querySnapShot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			if (userData.length > 0) {
				setUserOption({
					isLoading: false,
					user: userData[0] as unknown as UserCollectionType,
				});
			}
		} catch (error) {
			throw new Error("Can't fetch users");
		} finally {
			setUserOption((prev) => ({...prev, isLoading: false}));
		}
	};

	const refresh = () => {
		setUserOption((prev) => ({...prev, isLoading: true}));
		fetchUser();
	};

	React.useEffect(() => {
		let isMounted = true;

		if (isMounted && state.currentUser) {
			fetchUser();
		}

		return () => {
			isMounted = false;
		};
	}, [state.currentUser]);

	return [userOption, refresh];
};
