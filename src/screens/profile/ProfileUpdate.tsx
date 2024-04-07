import * as React from 'react';
/**
 * ? Local & Shared Imports
 */

import {
	AvatarUpload,
	ProfileScreenLayout,
	ProfileUpdateForm,
} from './components';

import {useUserDetails} from '@hooks';
import {useGlobalState} from '@lib/global-reducer';
import {Separator} from '@shared-components/separator';

export const ProfileUpdate: React.FC = () => {
	const {state} = useGlobalState();
	const [, refresh] = useUserDetails();

	return (
		<ProfileScreenLayout headerTitle='Update Profile'>
			<AvatarUpload imageUri={state.User?.photoURL} />
			<Separator height={30} />
			<ProfileUpdateForm
				currentUser={state.currentUser}
				option='update'
				refresh={refresh}
			/>
		</ProfileScreenLayout>
	);
};
