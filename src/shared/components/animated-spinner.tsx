import * as React from 'react';
import {
	Animated,
	ColorValue,
	Easing,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';

/**
 * ? Local & Shared Imports
 */

type CustomStyleProp = StyleProp<ViewStyle> | StyleProp<ViewStyle>[];

interface AnimatedSpinnerProps {
	color?: ColorValue;
	style?: CustomStyleProp;
	durationMs?: number;
	radius?: number;
	radiusWidth?: number;
}

const startRotationAnimation = (ms: number, rotationDegree: Animated.Value) => {
	Animated.loop(
		Animated.timing(rotationDegree, {
			toValue: 360,
			duration: ms,
			easing: Easing.linear,
			useNativeDriver: true,
		})
	).start();
};

export const AnimatedSpinner: React.FC<AnimatedSpinnerProps> = ({
	color,
	durationMs = 1200,
	radius = 24,
	radiusWidth = 4,
	style,
}) => {
	const rotationDegree = React.useRef<Animated.Value>(
		new Animated.Value(0)
	).current;

	React.useEffect(() => {
		startRotationAnimation(durationMs, rotationDegree);
	}, [durationMs, rotationDegree]);

	const height = radius;
	const width = radius;
	const borderRadius = radius / 2;
	const borderWidth = radiusWidth;

	return (
		<View
			accessibilityLabel='animated spinner'
			accessibilityRole='progressbar'
			style={[styles.container, style, {height, width}]}
		>
			<View
				style={[
					styles.background,
					{borderColor: color},
					{borderRadius},
					{borderWidth},
				]}
			/>
			<Animated.View
				style={[
					styles.progress,
					{borderTopColor: color},
					{borderWidth},
					{borderRadius},
					{
						transform: [
							{
								rotate: rotationDegree.interpolate({
									inputRange: [0, 360],
									outputRange: ['0deg', '360deg'],
								}),
							},
						],
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	background: {
		width: '100%',
		height: '100%',
		opacity: 0.25,
	},
	progress: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'transparent',
	},
});
