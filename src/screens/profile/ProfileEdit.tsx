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

export const ProfileEdit: React.FC = () => {
	const {state} = useGlobalState();
	const [{user}, refresh] = useUserDetails();

	return (
		<ProfileScreenLayout headerTitle='Edit Profile'>
			<AvatarUpload imageUri={state.User?.photoURL} />
			<Separator height={30} />
			<ProfileUpdateForm
				currentUser={state.currentUser}
				option='edit'
				user={user}
				refresh={refresh}
			/>
		</ProfileScreenLayout>
	);
};
