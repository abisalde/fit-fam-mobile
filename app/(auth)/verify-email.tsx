import * as React from 'react';

import {sendEmailVerification} from 'firebase/auth';
import {Redirect, router, useLocalSearchParams} from 'expo-router';
import {Alert, GestureResponderEvent, StyleSheet, View} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {Button} from '@shared-components/button';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {loginUser, useGlobalState} from '@lib/global-reducer';
import {maskEmail} from '@lib/helpers';
import {fontPixel, pixelSizeHorizontal} from '@utils/normalize';

import {palette} from '@app-theme';

export default function VerifyEmail() {
	const [timer, setTimer] = React.useState<boolean>(true);
	const [countdown, setCountdown] = React.useState<number>(60);

	const {dispatch, state} = useGlobalState();

	const {email = ''} = useLocalSearchParams();

	const resendEmail = React.useCallback(
		(e: GestureResponderEvent) => {
			e.preventDefault();

			if (state.currentUser !== null) {
				const user = state.currentUser;
				sendEmailVerification(user);
				setTimer(true);

				Alert.alert(
					'Email Verification',
					'Please email for verification link and follow the process'
				);
			}
		},
		[state.currentUser]
	);

	if (!email) return <Redirect href='/sign-in' />;

	React.useEffect(() => {
		let intervalId: ReturnType<typeof setInterval>;

		intervalId = setInterval(() => {
			state.currentUser
				?.reload()
				.then(() => {
					if (state.currentUser?.emailVerified) {
						loginUser(dispatch, state.currentUser?.providerData[0]);
						clearInterval(intervalId);
						setTimeout(() => {
							router.navigate('/');
						}, 800);
					}
				})
				.catch((error) => {
					Alert.alert('Email Validation', error.message);
					throw new Error(`${error.message}: Email Validation`);
				});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [state.currentUser]);

	React.useEffect(() => {
		let intervalTimer: ReturnType<typeof setInterval>;

		if (timer && countdown !== 0) {
			intervalTimer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		} else if (countdown === 0) {
			setTimer(false);
			setCountdown(60);

			if (state.currentUser?.emailVerified) {
				loginUser(dispatch, state.currentUser?.providerData[0]);
				setTimeout(() => {
					router.navigate('/');
				}, 800);
			}
		}

		return () => clearInterval(intervalTimer);
	}, [timer, countdown]);

	return (
		<View style={styles.root}>
			<Text center fontFamily='DMSansSemiBold' h2 color={palette.black}>
				Verify your Email Address
			</Text>
			<Separator height={12} />
			<Text center fontFamily='DMSansBold' h4 color={palette.primary}>
				Kindly check your email {`${maskEmail(email.toString())}`} for a
				verification link
			</Text>
			<Separator height={12} />
			<Text center style={styles.instructionText}>
				Follow the instruction in the email to verify your account
			</Text>
			<Separator height={35} />
			<Button
				disabled={timer}
				textLabel={`Resend email ${timer ? `(${countdown})` : ''}`}
				style={styles.button}
				onPress={resendEmail}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: pixelSizeHorizontal(26),
		width: '100%',
		backgroundColor: 'white',
	},
	instructionText: {
		fontSize: fontPixel(16),
		fontFamily: 'DMSansThin',
	},
	button: {
		width: '100%',
	},
});
