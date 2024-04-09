import * as React from 'react';
import {query, where, getDocs} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

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
} from '@utils/firebase';

/**
 *
 * @returns
 * @callback deleteAccount
 * @callback openCloseModal
 * @param { DeleteParams }
 * @param { isDeleting, modalVisible}
 */

type DeleteParams = {
	username: string;
	imageString: string;
	currentUser: userTypeProps;
};

export const useDeleAccount = () => {
	const [isDeleting, setIsDeleting] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const {dispatch} = useGlobalState();

	const deleteAccount = React.useCallback(
		async ({username, imageString, currentUser}: DeleteParams) => {
			setIsDeleting(true);

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
				console.error('Error deleting User Error', error);
			} finally {
				setIsDeleting(false);
				setModalVisible(false);
				resetApp(dispatch);
			}
		},
		[dispatch]
	);

	const openCloseModal = () => setModalVisible((c) => !c);

	return {
		isDeleting,
		deleteAccount,
		openCloseModal,
		modalVisible,
	};
};
