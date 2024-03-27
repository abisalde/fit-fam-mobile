import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
/**
 * ? Local & Shared Imports
 */

import {
	AvatarUpload,
	ProfileScreenLayout,
	ProfileUpdateForm,
} from './components';

import {Button} from '@shared-components/button';
import {useGlobalState} from '@lib/global-reducer';
import {Separator} from '@shared-components/separator';
import {AnimatedSpinner} from '@shared-components/animated-spinner';
import {heightPixel} from '@utils/normalize';

export const ProfileUpdate: React.FC = () => {
	const {state} = useGlobalState();

	return (
		<ProfileScreenLayout headerTitle='Update Profile'>
			<ScrollView
				style={styles.root}
				showsVerticalScrollIndicator={false}
				horizontal={false}
				contentContainerStyle={styles.container}
			>
				<AvatarUpload imageUri={state.User?.photoURL} />
				<Separator height={30} />
				<ProfileUpdateForm currentUser={state.currentUser} option='update' />
			</ScrollView>
		</ProfileScreenLayout>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		paddingTop: heightPixel(20),
	},
});
