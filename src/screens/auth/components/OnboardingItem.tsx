import * as React from 'react';
import {
	Animated,
	Image,
	ImageSourcePropType,
	StyleSheet,
	View,
} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {Text} from '@shared-components/text-wrapper';
import {Separator} from '@shared-components/separator';

import {palette} from '@app-theme';
import {FontKeys} from '@utils/font-keys';
import {heightPixel, pixelSizeHorizontal, SCREEN_WIDTH} from '@utils/normalize';

interface OnboardingItemProps {
	Icon: ImageSourcePropType;
	title: string;
	id: string;
}

export const OnboardingItem: React.FC<OnboardingItemProps> = ({
	Icon,
	title,
}) => {
	return (
		<View style={styles.root}>
			<Text
				center
				fontFamily={FontKeys.DMSansMedium}
				h3
				color={palette.white}
				style={styles.textItem}
			>
				{title}
			</Text>
			<Separator height={35} />
			<Image source={Icon} resizeMode='cover' resizeMethod='auto' />
		</View>
	);
};

interface PaginatorProps {
	data: OnboardingItemProps[];
	scrollX: Animated.Value;
}

export const Paginator: React.FC<PaginatorProps> = ({data = [], scrollX}) => {
	return (
		<View style={styles.paginatorContainer}>
			{data.map(({id}, index) => {
				const inputRange = [
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 25, 10],
					extrapolate: 'clamp',
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.2, 1, 0.2],
					extrapolate: 'clamp',
				});
				return (
					<Animated.View
						style={[styles.dot, {width: dotWidth, opacity}]}
						key={id}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,
	},
	textItem: {
		paddingHorizontal: pixelSizeHorizontal(50),
	},
	paginatorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: heightPixel(25),
	},
	dot: {
		backgroundColor: palette.primary,
		height: 10,
		borderRadius: 10,
		marginHorizontal: 4,
	},
});
