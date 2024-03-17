import {StyleSheet, View} from 'react-native';

/**
 * ? Local & Shared Imports
 */

import {AnimatedSpinner} from './animated-spinner';
import {palette} from '@app-theme';

export function LoadingFullScreen() {
	return (
		<View style={styles.root}>
			<AnimatedSpinner
				color={palette.secondary}
				radius={100}
				radiusWidth={10}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
