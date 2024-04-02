import * as React from 'react';

/**
 * ? Local & Shared Imports
 */

import {ProfileScreenLayout} from './components';

import {useGlobalState} from '@lib/global-reducer';
import {Separator} from '@shared-components/separator';

export const ProfileEdit: React.FC = () => {
	const {state} = useGlobalState();

	return (
		<ProfileScreenLayout headerTitle='Edit Profile'>
			<Separator height={30} />
		</ProfileScreenLayout>
	);
};
