import {Stack} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
/**
 * ? Local Shared Imports
 */

export default function AuthLayout() {
	return (
		<SafeAreaView style={{flex: 1}}>
			<Stack screenOptions={{headerShown: false}} />;
		</SafeAreaView>
	);
}
