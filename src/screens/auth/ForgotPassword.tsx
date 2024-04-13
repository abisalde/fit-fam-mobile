import * as React from 'react';

/**
 * ? Local & Shared Imports
 */
import {Button} from '@shared-components/button';

import {
	fetchSignInMethodsForEmail,
	FITFAMAPP,
	sendPasswordResetEmail,
} from '@utils/firebase';
import {ScreenWrapper} from '@shared-components/screen-wrapper';

const email = 'ger_gemam@yahoo.com';

export const ForgotPasswordScreen: React.FC = () => {
	const sendEmail = async () => {
		try {
			// const l = await fetchSignInMethodsForEmail(FITFAMAPP, email);
			const res = await sendPasswordResetEmail(FITFAMAPP, email);

			console.log({res});
		} catch (error) {
			console.log({error});
			if (error instanceof Error) {
				const errorMessage = error.message;

				console.log({error}, {errorMessage});
			}
		}
	};

	return (
		<ScreenWrapper>
			<Button textLabel='Send' onPress={sendEmail} />
		</ScreenWrapper>
	);
};
