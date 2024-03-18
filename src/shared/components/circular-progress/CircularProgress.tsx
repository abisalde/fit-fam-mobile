import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {G, Path, Svg} from 'react-native-svg';

/**
 * ? Local Imports
 */
import createStyles from './CircularProgress.styles';

import type {ViewStyleProp} from '@types';

export interface PolarCartesianProps {
	cx: number;
	cy: number;
	r: number;
	angleInDegrees: number;
}

enum CirclePathProps {
	x = 'x',
	y = 'y',
	radius = 'radius',
	startAngle = 'startAngle',
	endAngle = 'endAngle',
}

export type CirclePath = {
	[CirclePathProps.x]: number;
	[CirclePathProps.y]: number;
	[CirclePathProps.radius]: number;
	[CirclePathProps.startAngle]: number;
	[CirclePathProps.endAngle]: number;
};

type ICircularProgressProps = {
	backgroundColor?: string;
	backgroundWidth: number;
	borderStrokeWidth: number;
	children?: React.ReactNode;
	distance?: number;
	fill: number;
	percentage: number;
	padding?: number;
	width: number;
	size: number;
	style?: ViewStyleProp;
	tintColor?: string;
};

const ARC_ANGLE = 360;
const ROTATION_ANGLE = 360;

export const CircularProgress: React.FC<ICircularProgressProps> = ({
	backgroundColor,
	backgroundWidth,
	borderStrokeWidth = 1,
	children,
	distance = backgroundWidth + 0.5,
	fill,
	padding = 0,
	percentage = 12,
	size,
	style,
	tintColor,
	width,
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);
	// Width of the Circle
	const circleWidth = Math.max(width, backgroundWidth);
	// Padding Size of the Circle
	const paddingSize = size / 2 + padding / 2;
	// Radius of the Circle
	const circleRadius = size / 2 - circleWidth / 2 - padding / 2;
	// Calculate the angle of the fill
	const circleEndAngle = (fill * ARC_ANGLE) / percentage;

	const [endingAngle, setEndingAngle] = React.useState<number>(0);

	React.useEffect(() => {
		if (circleEndAngle === 360) {
			setEndingAngle(ARC_ANGLE);
		} else {
			setEndingAngle(0);
		}
	}, [circleEndAngle, setEndingAngle]);

	// Draw Path to fill the Circle
	const drawCirclePath = generateCirclePath({
		x: paddingSize,
		y: paddingSize,
		radius: circleRadius - backgroundWidth / 2,
		startAngle: -circleEndAngle,
		endAngle: endingAngle,
	});

	// Draw Single Circle line the fill path will follow
	const drawCircle = generateCirclePath({
		x: paddingSize,
		y: paddingSize,
		radius: circleRadius,
		startAngle: 0,
		endAngle: ARC_ANGLE,
	});

	const drawCircle2 = generateCirclePath({
		x: paddingSize,
		y: paddingSize,
		radius: circleRadius - distance,
		startAngle: 0,
		endAngle: ARC_ANGLE,
	});

	// Offset
	const OFFSET = size - circleWidth * 2;

	return (
		<View style={styles.root}>
			<View style={[style]}>
				<Svg width={size + padding} height={size + padding}>
					<G
						rotation={ROTATION_ANGLE}
						originX={(size + padding) / 2}
						originY={(size + padding) / 2}
					>
						<Path
							d={drawCircle}
							stroke={backgroundColor || colors.primary}
							strokeWidth={borderStrokeWidth}
							strokeLinecap='butt'
							fill={colors.transparent}
						/>
						<Path
							d={drawCircle2}
							stroke={backgroundColor || colors.primary}
							strokeWidth={borderStrokeWidth}
							strokeLinecap='butt'
							fill={colors.transparent}
						/>
						<Path
							d={drawCirclePath}
							stroke={tintColor || colors.primary}
							strokeWidth={width}
							strokeLinecap='butt'
							fill={colors.transparent}
						/>
					</G>
				</Svg>
				{children && (
					<View
						style={[
							styles.children,
							{
								height: OFFSET,
								width: OFFSET,
								left: circleWidth + padding / 2,
								top: circleWidth + padding / 2,
							},
						]}
					>
						{children}
					</View>
				)}
			</View>
		</View>
	);
};

CircularProgress.defaultProps = {
	fill: 0, // Radius the fill the circle
	width: 5, // width of the radius to fill the circle
	size: 50, // Size of the circle
	padding: 0, // Padding of the circle
	backgroundWidth: 5, // background width to fill the circle, just as the width
	backgroundColor: '#fff', // background color line of the circle
	tintColor: '#000', // color of the circle
	borderStrokeWidth: 1, // border width of the circle
};

export const polarCartesianCalculator = (props: PolarCartesianProps) => {
	const {cx, cy, r, angleInDegrees} = props;
	const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
	const x = cx + r * Math.cos(angleInRadians);
	const y = cy + r * Math.sin(angleInRadians);
	return {x, y};
};

export const generateCirclePath = (props: CirclePath) => {
	const {x, y, radius, startAngle, endAngle} = props;
	const start = polarCartesianCalculator({
		cx: x,
		cy: y,
		r: radius,
		angleInDegrees: endAngle * 0.9999,
	});
	const end = polarCartesianCalculator({
		cx: x,
		cy: y,
		r: radius,
		angleInDegrees: startAngle,
	});
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
	const d = [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y,
	];
	return d.join(' ');
};
