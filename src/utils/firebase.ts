// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

import {
	onAuthStateChanged,
	deleteUser,
	signOut,
	updateProfile,
	getReactNativePersistence,
	initializeAuth,
	type User,
	type UserInfo,
} from 'firebase/auth';
import {
	addDoc,
	getFirestore,
	doc,
	deleteDoc,
	getDoc,
	setDoc,
	collection as DBCollection,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	uploadBytesResumable,
	deleteObject,
} from 'firebase/storage';

/**
 * ? Local & Shared Imports
 */
import {API_KEY} from '@shared-constants/app-config';
import {storage} from '@local-storage';

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'fit-fam-mobile.firebaseapp.com',
	projectId: 'fit-fam-mobile',
	storageBucket: 'fit-fam-mobile.appspot.com',
	messagingSenderId: '974468869003',
	appId: '1:974468869003:web:a2969a7f1c35064041dd8e',
	measurementId: 'G-QT32DX9859',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FITFAMAPP = initializeAuth(app, {
	persistence: getReactNativePersistence(storage),
});
const database = getFirestore(app);
const storageBucket = getStorage(app);

export {
	addDoc,
	database,
	DBCollection,
	FITFAMAPP,
	onAuthStateChanged,
	signOut,
	doc,
	getDoc,
	setDoc,
	uploadBytes,
	getDownloadURL,
	uploadBytesResumable,
	updateProfile,
	ref,
	storageBucket,
	deleteDoc,
	deleteObject,
	deleteUser,
};

export type userTypeProps = User;
export type userInfoType = UserInfo;
