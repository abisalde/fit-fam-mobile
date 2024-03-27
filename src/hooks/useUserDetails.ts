import * as React from 'react';
import {query, where, getDocs} from 'firebase/firestore';

/**
 * > Local & Shared Imports
 */
import {useGlobalState} from '@lib/global-reducer';
import {COLLECTIONS_NAME, type UserCollectionType} from '@types';
import {database, DBCollection} from '@utils/firebase';

type UserCollectionStateType = {
	isLoading: boolean;
	user: UserCollectionType | undefined;
};

export const useUserDetails = (): UserCollectionStateType => {
	const {state} = useGlobalState();
	const [userOption, setUserOption] = React.useState<UserCollectionStateType>({
		isLoading: true,
		user: undefined,
	});

	React.useEffect(() => {
		let isMounted = true;

		const fetchUser = async () => {
			if (state.currentUser && isMounted) {
				try {
					const getData = query(
						DBCollection(database, COLLECTIONS_NAME.USERS),
						where('user_id', '==', state.currentUser.uid)
					);
					const querySnapShot = await getDocs(getData);
					const userData = querySnapShot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));

					if (userData && isMounted) {
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
			}
		};

		fetchUser();

		return () => {
			isMounted = false;
		};
	}, [userOption.isLoading, state.currentUser]);

	return userOption;
};
