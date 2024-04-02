import * as React from 'react';

/**
 * ? Local & Shared Imports
 */

import {ProfileScreenLayout} from './components';

import {useGlobalState} from '@lib/global-reducer';
import {Separator} from '@shared-components/separator';

export const Profile: React.FC = () => {
	const {state} = useGlobalState();

	return (
		<ProfileScreenLayout headerTitle='Profile' isIndex={true}>
			<Separator height={30} />
		</ProfileScreenLayout>
	);
};
