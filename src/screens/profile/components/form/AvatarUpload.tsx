import * as React from 'react';
import {
	Alert,
	GestureResponderEvent,
	Image,
	Linking,
	TouchableOpacity,
	View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import {v4 as uuidv4} from 'uuid';
/**
 * ? Local & Shared Imports
 */
import createStyles from './form.styles';

import {Button} from '@shared-components/button';
import {Modal} from '@shared-components/modal';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {
	database,
	doc,
	getDownloadURL,
	ref,
	setDoc,
	storageBucket,
	updateProfile,
	getDoc,
	uploadBytesResumable,
	currentUser,
} from '@utils/firebase';

import {FontKeys} from '@utils/font-keys';
import {COLLECTIONS_NAME} from '@types';

import {iOS} from '@shared-constants/app-config';

interface AvatarUploadProps {
	imageUri?: string | null;
}

type UpdateOptions = {
	progress: number;
	loading: boolean;
	error: string;
};

const defaultOptions: UpdateOptions = {
	progress: 0,
	loading: false,
	error: '',
};

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
	imageUri = null,
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const [avatar, setImageAvatar] = React.useState<string | null>(imageUri);
	const [visible, setVisible] = React.useState(false);
	const [updateOptions, setUpdateOptions] =
		React.useState<UpdateOptions>(defaultOptions);
	const [status, requestPermission] = ImagePicker.useCameraPermissions();

	const openModal = async (e: GestureResponderEvent) => {
		e.stopPropagation();
		setVisible((v) => !v);
	};

	const cameraRequestCallback = async () => {
		const result = await ImagePicker.getCameraPermissionsAsync();

		if (result.status === 'denied') {
			await requestPermission();
		} else if (!status?.granted) {
			Alert.alert(
				'Camera Permission',
				'FitFam App needs access to your camera/gallery for you to upload a picture',
				[
					{
						text: 'OK',
						onPress: () => {
							if (iOS) {
								Linking.openSettings();
							}
						},
					},
				]
			);
		}
	};

	const pickImage = React.useCallback(
		async (e: GestureResponderEvent, mode: 'camera' | 'gallery') => {
			e.stopPropagation();
			let imageResult = null;

			if (mode === 'camera') {
				await cameraRequestCallback();

				if (!status?.granted) {
					Linking.openSettings();
				} else {
					const result = await ImagePicker.launchCameraAsync({
						mediaTypes: ImagePicker.MediaTypeOptions.Images,
						allowsEditing: true,
						aspect: [4, 3],
						quality: 1,
						cameraType: ImagePicker.CameraType.front,
					});
					imageResult = !result.canceled ? result.assets[0].uri : null;
				}
			} else {
				const result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});
				imageResult = !result.canceled ? result.assets[0].uri : null;
			}
			setImageAvatar(imageResult);
		},
		[status]
	);

	const uploadImage = React.useCallback(async () => {
		setUpdateOptions((prev) => ({...prev, loading: true}));
		setVisible(true);
		let imageBlob: Blob;
		try {
			imageBlob = await new Promise((res, rej) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function () {
					res(xhr.response);
				};
				xhr.onerror = function () {
					Alert.alert(
						'🛜️ Network Error! 🚫️',
						'Network request failed, please try again'
					);
					rej(new TypeError('Network request failed'));
				};

				xhr.responseType = 'blob';
				xhr.open('GET', avatar as string, true);
				xhr.send(null);
			});

			const avatarRef = ref(
				storageBucket,
				`${COLLECTIONS_NAME.IMAGE}::${currentUser?.email}:::${uuidv4()}`
			);
			const result = uploadBytesResumable(avatarRef, imageBlob);

			result.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUpdateOptions((prev) => ({...prev, progress}));
				},
				(error) => {
					const message = error.message;
					setUpdateOptions((prev) => ({
						...prev,
						progress: 0,
						loading: false,
						error: message,
					}));
					Alert.alert(
						'Upload Failed',
						'Uploading of avatar failed, Please try again'
					);
				},
				() => {
					getDownloadURL(result.snapshot.ref).then(
						async (url): Promise<void> => {
							console.log({url});

							try {
								if (currentUser) {
									updateProfile(currentUser, {
										photoURL: url,
									});

									const docRef = doc(
										database,
										COLLECTIONS_NAME.USERS,
										currentUser.uid
									);
									const docRefSnap = await getDoc(docRef);

									if (docRefSnap.exists()) {
										await setDoc(docRef, {image: url}, {merge: true});
									} else {
										await setDoc(docRef, {image: url, id: currentUser.uid});
									}

									setImageAvatar(url);
								}
							} catch (error) {
								console.log({error}, 'HERE::::::::');
							} finally {
								setUpdateOptions(defaultOptions);
								setVisible(false);
							}
						}
					);
				}
			);

			// imageBlob?.close();
		} catch (error) {
			console.log({error});
		}
	}, [avatar]);

	return (
		<View style={styles.avatarUploadRoot}>
			<Separator height={40} />

			<View style={styles.avatarContainer}>
				{!avatar ? (
					<Text color={colors.dark} fontFamily={FontKeys.DMSansMedium} center>
						Upload a picture
					</Text>
				) : (
					<Image
						source={{uri: avatar}}
						resizeMode='cover'
						style={styles.avatar}
					/>
				)}
				<TouchableOpacity
					style={styles.avatarPickerIcon}
					activeOpacity={0.6}
					accessibilityLabel='Press to pop-up options for camera or gallery'
					accessibilityRole='button'
					onPress={openModal}
				>
					<Ionicons name='camera-sharp' size={23} color={colors.tabBgColor} />
				</TouchableOpacity>
			</View>

			<Modal
				visible={visible}
				onDismiss={openModal}
				type='slide'
				style={styles.avatarModalRoot}
			>
				<View style={styles.avatarModalContainer}>
					<Separator height={28} />
					<Button
						textLabel='Capture with camera'
						variant='secondary'
						onPress={(e) => pickImage(e, 'camera')}
					/>
					<Separator height={16} />
					<Button
						textLabel='Choose from gallery'
						variant='secondary'
						onPress={(e) => pickImage(e, 'gallery')}
					/>
					<Separator height={16} />
					<Button
						onPress={uploadImage}
						textLabel={`Upload your avatar ${
							updateOptions.loading
								? `Uploading (${updateOptions.progress})`
								: ''
						}`}
						style={styles.uploadButton}
						disabled={!avatar}
						loading={updateOptions.loading}
					/>
					<Separator height={28} />
				</View>
			</Modal>
		</View>
	);
};
