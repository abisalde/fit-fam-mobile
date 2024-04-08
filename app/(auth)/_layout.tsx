import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
/**
 * ? Local Shared Imports
 */

export default function AuthLayout() {
	return (
		<>
			<Stack screenOptions={{headerShown: false}} />
			<StatusBar style='dark' />
		</>
	);
}
