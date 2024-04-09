import * as React from 'react';
import {
	StyleSheet,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	GestureResponderEvent,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';

/**
 *
 * ? Local & Shared Imports
 */

import {AnimatedCircularProgress} from '@shared-components/AnimatedCircularProgress';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {FontKeys} from '@utils/font-keys';
import {SCREEN_HEIGHT, pixelSizeVertical, scaledPixel} from '@utils/normalize';
import {palette} from '@app-theme';
import {UserCollectionType} from '@types';

interface ProfileCardProps {
	user?: UserCollectionType;
	loading: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({loading, user}) => {
	const transformValues = React.useMemo(() => {
		const defaultValues = {
			image: 'https://i.imgur.com/7gYHZpF.jpeg',
			first_name: 'John',
			last_name: 'Doe',
			progress: 0,
			completed: 0,
		};

		if (!user) return defaultValues;

		return {
			image: user.image ?? defaultValues.image,
			first_name: user.first_name ?? defaultValues.first_name,
			last_name: user.last_name ?? defaultValues.last_name,
			progress:
				user.image && user.first_name !== undefined
					? 1
					: user.first_name === undefined
					? 0.2
					: 0.7,
			completed:
				user.image && user.first_name !== undefined
					? 100
					: user.first_name === undefined
					? 20
					: 70,
		};
	}, [user]);

	const navigateLink = React.useCallback(
		(e: GestureResponderEvent) => {
			e.stopPropagation();
			router.push(user?.first_name ? '/profile' : '/(app)/profile-update');
		},
		[user]
	);

	return (
		<SafeAreaView style={styles.root}>
			<LinearGradient
				colors={[palette.primary, palette.gradientTwo]}
				start={{x: 0, y: 0}}
				end={{x: -0.15, y: 1}}
				style={styles.gradient}
			/>
			<View style={styles.container}>
				{loading ? (
					<ActivityIndicator
						animating={true}
						size='large'
						color={palette.gradientOne}
					/>
				) : (
					<TouchableOpacity
						accessibilityLabel='Navigate to profile'
						accessibilityRole='button'
						activeOpacity={0.65}
						onPress={navigateLink}
					>
						<AnimatedCircularProgress
							size={125}
							strokeWidth={6}
							progressState={transformValues.progress}
							circleStrokeColor={palette.transparent}
						>
							<Image
								source={{uri: transformValues.image}}
								resizeMode='cover'
								style={styles.image}
							/>
						</AnimatedCircularProgress>
						<Separator height={75} />

						<Text
							style={styles.username}
							fontFamily={FontKeys.DMSansSemiBold}
							color={palette.white}
							center
						>
							{`${transformValues.first_name} ${transformValues.last_name}`}
						</Text>
					</TouchableOpacity>
				)}
				{!loading && transformValues.completed !== 100 && (
					<Text
						h5
						fontFamily={FontKeys.DMSansMedium}
						color={palette.white}
						center
					>
						Profile is {transformValues.completed}% completed
					</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: {
		height: SCREEN_HEIGHT / 2.55,
		overflow: 'hidden',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: palette.transparent,
		width: '100%',
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
	},
	container: {
		paddingTop: pixelSizeVertical(25),
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		flexDirection: 'column',
	},
	image: {
		width: 115,
		height: 115,
		borderRadius: 62.5,
	},
	username: {
		fontSize: scaledPixel(25),
		lineHeight: scaledPixel(32),
		textTransform: 'capitalize',
	},
});
