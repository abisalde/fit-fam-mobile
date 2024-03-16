import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

/**
 * ? Local Imports
 */
export const storage = AsyncStorage;
import {WEB} from '@shared-constants/app-config';

export async function setStorageItemAsync(key: string, value: string | null) {
	if (WEB) {
		try {
			if (value === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		} catch (e) {
			console.error('Local storage is unavailable:', e);
			throw e;
		}
	} else {
		if (value == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, value);
		}
	}
}

export async function getStorageItemAsync(key: string) {
	if (WEB) {
		try {
			if (typeof localStorage !== 'undefined') {
				return localStorage.getItem(key);
			}
		} catch (e) {
			console.error('Local storage is unavailable: ', e);
		}
		return null; // Return null if localStorage is unavailable
	} else {
		try {
			const secure = await SecureStore.getItemAsync(key);
			return secure;
		} catch (error) {
			console.error('Error retrieving secure storage item: ', error);
			return null; // Return null if an error occurs while accessing SecureStore
		}
	}
}
