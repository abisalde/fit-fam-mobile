import * as React from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Circle} from 'react-native-svg';
import Animated, {
	useSharedValue,
	withTiming,
	Easing,
	useAnimatedProps,
} from 'react-native-reanimated';

import {palette} from '@app-theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedCircularProgressProps = {
	size?: number; // Size of the Circle
	strokeWidth?: number; // Stroke Width for the Circle
	progressState?: number; // Progress State for the Animated (Must be between 0 and 1)
	stopOffSetColorOne?: ColorValue; // Gradient color for the Animated Circle
	stopOffSetColorTwo?: ColorValue; // Gradient color for for the Animated Circle
	circleStrokeColor?: ColorValue; //  Initial Color for the Circle
} & React.PropsWithChildren;

export const AnimatedCircularProgress: React.FC<
	AnimatedCircularProgressProps
> = ({
	size = 50,
	strokeWidth = 6,
	progressState = 0.5,
	children,
	stopOffSetColorOne = palette.gradientOne,
	stopOffSetColorTwo = '#E5AEFF',
	circleStrokeColor = palette.grey3,
}) => {
	const {PI} = Math;
	const r = (size - strokeWidth) / 2;
	const cx = size / 2;
	const cy = size / 2;

	const progress = useSharedValue(0);

	const config = {
		duration: 10 * 1000,
		toValue: Math.max(0, Math.min(1, progressState)),
		easing: Easing.linear,
	};

	React.useEffect(() => {
		progress.value = withTiming(config.toValue, config);
	}, [progressState]);

	const circumference = r * 2 * PI;

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: circumference * (1 - progress.value),
	}));

	return (
		<View style={styles.root}>
			<Svg width={size} height={size} style={styles.container}>
				<Defs>
					<LinearGradient id='grad' x1='0' y1='0' x2='100%' y2='0'>
						<Stop offset='0' stopColor={stopOffSetColorOne} />
						<Stop offset='1' stopColor={stopOffSetColorTwo} />
					</LinearGradient>
				</Defs>
				<Circle
					stroke={circleStrokeColor}
					fill='none'
					{...{
						strokeWidth,
						cx,
						cy,
						r,
					}}
				/>
				<AnimatedCircle
					stroke='url(#grad)'
					fill='none'
					strokeDasharray={`${circumference}, ${circumference}`}
					cx={cx}
					cy={cy}
					strokeWidth={strokeWidth}
					r={r}
					animatedProps={animatedProps}
					strokeLinecap={'round'}
				/>
			</Svg>
			<View
				style={[styles.children, {width: circumference, height: circumference}]}
			>
				{children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		flexBasis: 0,
	},
	container: {
		transform: [{rotateZ: '270deg'}],
		position: 'absolute',
		overflow: 'hidden',
	},
	children: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
