import {Platform} from 'react-native';

export const Android = Platform.OS === 'android';
export const iOS = Platform.OS === 'ios';
export const WEB = Platform.OS === 'web';

export const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? '';

export const APP_GLOBAL_STATE = 'FITFAMMOBILEUser';
