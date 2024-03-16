// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

import {
	User,
	onAuthStateChanged,
	signOut,
	updateProfile,
	getReactNativePersistence,
	initializeAuth,
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	uploadBytesResumable,
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
	database,
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
};

export type userTypeProps = User;