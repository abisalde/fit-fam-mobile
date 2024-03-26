import * as React from 'react';
import {View} from 'react-native';
/**
 * ? Local & Shared Imports
 */

import {AvatarUpload, ProfileScreenLayout} from './components';

import {Button} from '@shared-components/button';

export const ProfileUpdate: React.FC = () => {
	return (
		<ProfileScreenLayout headerTitle='Update Profile'>
			<AvatarUpload />
		</ProfileScreenLayout>
	);
};
