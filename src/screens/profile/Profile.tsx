import * as React from 'react';

import {
	GestureResponderEvent,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {router, useFocusEffect} from 'expo-router';
/**
 * ? Local & Shared Imports
 */

import {Avatar, NavigateCard, ProfileScreenLayout} from './components';

import {Button} from '@shared-components/button';
import {Modal} from '@shared-components/modal';
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
	const [{user}, refresh] = useUserDetails();
	const {modalVisible, deleteAccount, openCloseModal, isDeleting} =
		useDeleAccount();
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

			if (state.currentUser && user) {
				const currentUser = state.currentUser;
				const username = user.username;
				const imageString = user.image;
				deleteAccount({currentUser, username, imageString});
			}
		},
		[state.currentUser, user]
	);

	return (
		<ProfileScreenLayout headerTitle='Profile' isIndex={true}>
			<Separator height={25} />
			<View style={styles.top}>
				<Avatar image={transformValues.image} />
				<Separator height={12} />
				<Text
					h2
					fontFamily='DMSansBold'
					color={palette.black}
					center
					style={styles.name}
				>
					{`${transformValues.first_name} ${transformValues.last_name}`}
				</Text>
				<Text style={styles.username} center fontFamily='DMSansLight'>
					{transformValues.username}
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
			<Modal
				visible={modalVisible || isDeleting}
				onDismiss={isDeleting ? () => {} : openCloseModal}
				style={styles.deleteModalRoot}
			>
				<View style={styles.deleteModalContainer}>
					<Text center fontFamily='DMSansSemiBold' color={palette.black} h2>
						Are you sure you want to delete your account?
					</Text>
					<Separator height={15} />
					<Text h4 center fontFamily='DMSansLight' color={palette.black}>
						This action is irreversible and will delete all your data
						permanently.
					</Text>
					<Separator height={25} />
					<Button
						textLabel='Yes'
						loading={isDeleting}
						disabled={isDeleting}
						onPress={deletingInProgress}
						style={styles.deleteYesButton}
					/>
					<Separator height={16} />
					<Button
						textLabel='No'
						variant='secondary'
						onPress={openCloseModal}
						disabled={isDeleting}
					/>
				</View>
			</Modal>
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
	deleteModalRoot: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	deleteModalContainer: {
		backgroundColor: palette.white,
		zIndex: 10,
		borderRadius: 20,
		paddingHorizontal: pixelSizeHorizontal(16),
		paddingVertical: pixelSizeVertical(30),
		width: '100%',
	},
	deleteModalButtonContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	deleteYesButton: {
		backgroundColor: palette.success,
	},
});
