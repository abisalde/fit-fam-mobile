import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import {FormikHelpers} from 'formik';
import {router} from 'expo-router';

/**
 * ? Local & Shared Imports
 */
import createStyles from './form.styles';

import {
	FormContainer,
	FormField,
	SubmitButton,
	UsernameSearchField,
} from '@shared-components/forms';
import {Separator} from '@shared-components/separator';

import {
	addDoc,
	database,
	doc,
	setDoc,
	updateProfile,
	getDoc,
	userTypeProps,
	DBCollection,
} from '@utils/firebase';
import {useUsernameSearch} from '@hooks';

import {COLLECTIONS_NAME, type UserCollectionType} from '@types';

import {ProfileUpdateSchema} from '@services/form-schemas';
import {ProfileUpdateType} from '@services/model';
import {iOS} from '@shared-constants/app-config';

interface ProfileUpdateFormProps {
	currentUser: userTypeProps | null;
	option: 'update' | 'edit';
	user?: UserCollectionType;
}

export const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
	currentUser,
	option,
	user,
}) => {
	const theme = useTheme();
	const styles = React.useMemo(() => createStyles(theme), [theme]);
	const {setSearchOptions, searchUsername} = useUsernameSearch();

	const isUpdating = option === 'update';
	const unEditable = option === 'edit';

	const initialState = React.useMemo(
		() => ({
			first_name: isUpdating ? '' : user?.first_name ?? '',
			last_name: isUpdating ? '' : user?.last_name ?? '',
			username: isUpdating ? '' : user?.username ?? '',
			phone: isUpdating ? '' : user?.phone ?? '',
		}),
		[]
	);

	const handleFormSubmit = React.useCallback(
		async (
			values: ProfileUpdateType,
			actions: FormikHelpers<ProfileUpdateType>
		) => {
			if (currentUser) {
				const username = values.username?.toLocaleLowerCase();
				try {
					if (!unEditable) {
						const isValid = await searchUsername(username);
						if (!isValid) throw new Error('Username already exists');
					}

					updateProfile(currentUser, {
						displayName: username,
					});

					const docRef = doc(database, COLLECTIONS_NAME.USERS, currentUser.uid);
					const userDocSnap = await getDoc(docRef);
					const userExists = userDocSnap.exists();

					if (!unEditable) {
						await addDoc(DBCollection(database, COLLECTIONS_NAME.USERNAMES), {
							username,
						});
					}

					const userObject = Object.assign({}, values, {
						user_id: currentUser.uid,
						username,
					});

					const setDocOptions = userExists ? {merge: true} : {};
					await setDoc(docRef, userObject, setDocOptions);

					router.push('../');
				} catch (error) {
					Alert.alert(
						`${option === 'update' ? 'Updating' : 'Editing'} Profile`,
						'There was an ' + error
					);
				} finally {
					actions.resetForm();
					actions.setSubmitting(false);
					setSearchOptions({error: '', isValid: false});
				}
			}
		},
		[setSearchOptions]
	);

	return (
		<KeyboardAvoidingView
			style={styles.formContainerRoot}
			behavior={iOS ? 'padding' : 'height'}
		>
			<View style={styles.formContentContainer}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<FormContainer
						initialValues={initialState}
						validationSchema={ProfileUpdateSchema}
						onSubmit={handleFormSubmit}
					>
						<UsernameSearchField
							field='username'
							placeholder='Username'
							returnKeyType='next'
							editable={unEditable ? false : true}
						/>
						<Separator height={10} />
						<FormField
							field='first_name'
							placeholder='First Name'
							returnKeyType='next'
						/>
						<Separator height={10} />
						<FormField
							field='last_name'
							placeholder='Last Name'
							returnKeyType='next'
						/>
						<Separator height={10} />
						<FormField
							field='phone'
							placeholder='Phone Number (optional)'
							returnKeyType='done'
						/>
						<Separator height={25} />
						<SubmitButton textLabel='Update Profile' />
					</FormContainer>
				</TouchableWithoutFeedback>
			</View>
		</KeyboardAvoidingView>
	);
};
