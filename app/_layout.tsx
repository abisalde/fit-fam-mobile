import * as React from 'react';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {ThemeProvider} from '@react-navigation/native';
import {Slot} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

/**
 * ? Local & Shared Imports
 */
import fonts from '@fonts';

import {LightTheme} from '@app-theme';
import {Provider} from '@lib/Provider';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const customFonts = Object.assign({}, fonts, FontAwesome.font, Feather.font);

export default function RootLayout() {
	const [loaded, error] = useFonts(customFonts);

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	React.useEffect(() => {
		if (error) throw error;
	}, [error]);

	React.useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Provider>
			<ThemeProvider value={LightTheme}>
				<Slot screenOptions={{headerShown: false}} />
				<StatusBar style='dark' />
			</ThemeProvider>
		</Provider>
	);
}
