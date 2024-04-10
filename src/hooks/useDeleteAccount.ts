import * as React from 'react';
import {query, where, getDocs} from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

/**
 * > Local & Shared Imports
 */
import {resetApp, useGlobalState} from '@lib/global-reducer';
import {COLLECTIONS_NAME} from '@types';
import {
	database,
	DBCollection,
	storageBucket,
	ref,
	userTypeProps,
	deleteObject,
	deleteDoc,
	doc,
	deleteUser,
	FITFAMAPP,
} from '@utils/firebase';
import {Alert} from 'react-native';

/**
 *
 * @returns
 * @callback deleteAccount
 * @callback openCloseModal
 * @callback promptUserForPassword
 * @param { DeleteParams }
 * @param { DeleteAccountState }
 */

type DeleteParams = {
	username: string;
	imageString: string;
	currentUser: userTypeProps;
};

type DeleteAccountState = {
	deleting: boolean;
	visible: boolean;
	passwordState: boolean;
	password: string;
};

const initialState: DeleteAccountState = {
	deleting: false,
	visible: false,
	passwordState: false,
	password: '',
};

type PromptUserPassword = {
	email: string;
	password: string;
};

export const useDeleAccount = () => {
	const [deleteAccountState, setDeleteAccountState] =
		React.useState<DeleteAccountState>(initialState);
	const {dispatch} = useGlobalState();

	const deleteAccount = React.useCallback(
		async ({username, imageString, currentUser}: DeleteParams) => {
			setDeleteAccountState((prev) => ({...prev, deleting: true}));

			// Extracting the value from the URL using a regular expression
			const match = imageString.match(/\/([^/]+)\?alt=media/);
			const imageLinkExtract = match ? match[1] : '';
			const extractedLink = decodeURIComponent(imageLinkExtract);

			try {
				// Get The current Auth of the user because of Token
				const auth = getAuth();
				const user = auth.currentUser;
				// Create a Reference to delete image from the storage-bucket and use deleteObject to delete the image from ref
				await deleteObject(ref(storageBucket, extractedLink));

				// Create a ref to delete the users profile from the DOC
				await deleteDoc(doc(database, COLLECTIONS_NAME.USERS, currentUser.uid));

				// Delete the username of the users
				const docQuery = query(
					DBCollection(database, COLLECTIONS_NAME.USERNAMES),
					where('username', '==', username)
				);
				const querySnapshot = await getDocs(docQuery);

				// If a document exists with the provided username, delete it
				querySnapshot.forEach(async (doc) => {
					await deleteDoc(doc.ref);
				});

				// Delete User from the Whole App Stack
				if (user) {
					await deleteUser(user);
				}
			} catch (error) {
				console.error('Error deleting user information', error);
			} finally {
				setDeleteAccountState(initialState);
				resetApp(dispatch);
			}
		},
		[dispatch]
	);

	const openCloseModal = () =>
		setDeleteAccountState((prev) => ({
			...prev,
			visible: !prev.visible,
		}));

	const deleteYesAccount = () =>
		setDeleteAccountState((prev) => ({
			...prev,
			passwordState: true,
		}));

	const promptUserForPassword = async ({
		email,
		password,
	}: PromptUserPassword): Promise<boolean> => {
		setDeleteAccountState((prev) => ({...prev, deleting: true}));

		try {
			await signInWithEmailAndPassword(FITFAMAPP, email, password);
			return true;
		} catch (error) {
			let errorMessage = 'Unable to delete account now, please try again!';

			if (error instanceof Error) {
				const firebaseError = error.message;

				if (firebaseError.includes('auth/invalid-credential')) {
					errorMessage = 'Password is incorrect, please try again';
				} else if (firebaseError.includes('auth/too-many-requests')) {
					errorMessage =
						'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
					setDeleteAccountState(initialState);
				}

				// Display an alert with the appropriate error message
				Alert.alert('Error Alert ❗', errorMessage);
				setDeleteAccountState((prev) => ({
					...prev,
					password: '',
					deleting: false,
				}));

				if (!firebaseError.includes('auth/too-many-requests')) {
					setDeleteAccountState(initialState);
				}
			}
			return false;
		}
	};

	const handlePasswordChange = (password: string) =>
		setDeleteAccountState((prev) => ({...prev, password}));

	return {
		deleteAccount,
		deleteAccountState,
		deleteYesAccount,
		openCloseModal,
		promptUserForPassword,
		handlePasswordChange,
	};
};
