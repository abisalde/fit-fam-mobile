import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';

/**
 *
 * ? Local & Shared Imports
 */

import {AnimatedCircularProgress} from '@shared-components/AnimatedCircularProgress';

import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {SCREEN_HEIGHT, pixelSizeVertical, scaledPixel} from '@utils/normalize';
import {palette} from '@app-theme';
import {FontKeys} from '@utils/font-keys';

export const ProfileCard: React.FC = () => {
	return (
		<SafeAreaView style={styles.root}>
			<LinearGradient
				colors={[palette.primary, palette.gradientTwo]}
				start={{x: 0, y: 0}}
				end={{x: -0.15, y: 1}}
				style={styles.gradient}
			/>
			<View style={styles.container}>
				<AnimatedCircularProgress
					size={125}
					strokeWidth={6}
					progressState={0.7}
					circleStrokeColor={palette.transparent}
				>
					<Image
						source={{uri: 'https://picsum.photos/200/300'}}
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
					John Doe
				</Text>
				<Text
					h5
					fontFamily={FontKeys.DMSansMedium}
					color={palette.white}
					center
				>
					Profile is 5% completed
				</Text>
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
	},
});
