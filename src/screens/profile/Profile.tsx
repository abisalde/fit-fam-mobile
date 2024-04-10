import * as React from 'react';

import {
	ActivityIndicator,
	GestureResponderEvent,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {router, useFocusEffect} from 'expo-router';
/**
 * ? Local & Shared Imports
 */

import {
	Avatar,
	DeleteProfileModal,
	NavigateCard,
	ProfileScreenLayout,
} from './components';

import {Button} from '@shared-components/button';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {useGlobalState, resetAppState} from '@lib/global-reducer';
import {useDeleAccount, useUserDetails} from '@hooks';

import {palette} from '@app-theme';
import {
	pixelSizeHorizontal,
	pixelSizeVertical,
	scaledPixel,
	SCREEN_WIDTH,
} from '@utils/normalize';

export const Profile: React.FC = () => {
	const [{user, isLoading}, refresh] = useUserDetails();
	const {
		deleteAccount,
		openCloseModal,
		deleteYesAccount,
		promptUserForPassword,
		handlePasswordChange,
		deleteAccountState,
	} = useDeleAccount();
	const {dispatch, state} = useGlobalState();

	const handleLogout = () => resetAppState(dispatch);

	const remount = React.useCallback(() => {
		refresh();
	}, []);

	useFocusEffect(remount);

	const transformValues = React.useMemo(() => {
		const defaultValues = {
			image: 'https://i.imgur.com/7gYHZpF.jpeg',
			first_name: 'John',
			last_name: 'Doe',
			username: '@fitfam',
		};

		if (!user) return defaultValues;

		return {
			image: user.image ?? defaultValues.image,
			first_name: user.first_name ?? defaultValues.first_name,
			last_name: user.last_name ?? defaultValues.last_name,
			username: `@${user.username}` ?? defaultValues.username,
		};
	}, [user]);

	const navigateToProfileEdit = (e: GestureResponderEvent) => {
		e.stopPropagation();
		router.navigate('/(app)/profile-edit');
	};

	const deletingInProgress = React.useCallback(
		async (e: GestureResponderEvent) => {
			e.stopPropagation();
			const {password} = deleteAccountState;
			if (state.currentUser && user) {
				const currentUser = state.currentUser;
				const email = state.currentUser.email ?? '';
				const {username, image} = user;
				const imageString = image ?? '';
				const res = await promptUserForPassword({email, password});
				if (res) {
					await deleteAccount({currentUser, username, imageString});
				}
			}
		},
		[state.currentUser, user, promptUserForPassword, deleteAccountState]
	);

	return (
		<ProfileScreenLayout headerTitle='Profile' isIndex={true}>
			<Separator height={25} />
			<View style={styles.top}>
				{isLoading ? (
					<ActivityIndicator animating size='large' color={palette.secondary} />
				) : (
					<Avatar image={transformValues.image} />
				)}
				<Separator height={12} />
				<Text
					h2
					fontFamily='DMSansBold'
					color={palette.black}
					center
					style={styles.name}
				>
					{isLoading
						? 'Loading...'
						: `${transformValues.first_name} ${transformValues.last_name}`}
				</Text>
				<Text style={styles.username} center fontFamily='DMSansLight'>
					{isLoading ? 'Loading...' : `${transformValues.username}`}
				</Text>
				<Separator height={30} />
				<TouchableOpacity
					accessibilityRole='link'
					accessibilityLabel='Navigate to edit profile'
					style={styles.link}
					activeOpacity={0.7}
					onPress={navigateToProfileEdit}
				>
					<Text center h4 fontFamily='DMSansMedium' color={palette.white}>
						Edit Profile
					</Text>
				</TouchableOpacity>
			</View>
			<Separator height={50} />

			<View style={styles.navigateCardRoot}>
				<NavigateCard
					action={() => {}}
					iconName='password'
					title='Change Password'
				/>
				<NavigateCard action={() => {}} iconName='info' title='Information' />
				<NavigateCard action={handleLogout} iconName='logout' title='Logout' />
			</View>
			<Separator height={50} />
			<Button
				accessibilityRole='button'
				accessibilityLabel='Delete your account'
				style={styles.deleteButton}
				textLabel='Delete Account'
				onPress={openCloseModal}
			/>
			<DeleteProfileModal
				deleting={deleteAccountState.deleting}
				deleteConfirmation={deleteYesAccount}
				deleteInProgress={deletingInProgress}
				handlePasswordChange={handlePasswordChange}
				password={deleteAccountState.password}
				passwordState={deleteAccountState.passwordState}
				openCloseModal={openCloseModal}
				visible={deleteAccountState.visible}
			/>
		</ProfileScreenLayout>
	);
};

const styles = StyleSheet.create({
	top: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	name: {
		textTransform: 'capitalize',
	},
	username: {
		fontSize: scaledPixel(20),
		lineHeight: scaledPixel(25),
		textTransform: 'lowercase',
	},
	link: {
		backgroundColor: palette.primary,
		paddingHorizontal: pixelSizeHorizontal(35),
		paddingVertical: pixelSizeVertical(14),
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	navigateCardRoot: {
		borderTopWidth: 1,
		borderTopColor: palette.grey4,
		paddingVertical: pixelSizeVertical(20),
	},
	deleteButton: {
		backgroundColor: palette.error,
		width: SCREEN_WIDTH / 1.75,
	},
});
