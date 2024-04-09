import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {
	Animated,
	View,
	StyleProp,
	ViewStyle,
	ActivityIndicator,
	TextStyle,
	PressableProps,
	Pressable,
} from 'react-native';
/**
 * ? Local & Shared Imports
 */
import createStyles from './Button.styles';
import {Text} from '@shared-components/text-wrapper';

import type {TextStyleProp, ViewStyleProp} from '@types';

export type ButtonProps = {
	disabled?: boolean;
	textLabel: string | React.ReactNode;
	variant?: 'primary' | 'secondary';
	loading?: boolean;
	style?: ViewStyleProp;
	textStyle?: TextStyleProp;
} & RNBounceProps;

export const Button: React.FC<ButtonProps> = ({
	disabled,
	textLabel,
	loading,
	onPress,
	variant = 'primary',
	textStyle = {},
	style = {},
	...props
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const buttonContainerStyle: StyleProp<ViewStyle> = React.useMemo(
		() => [
			styles.container,
			{
				backgroundColor:
					variant === 'primary'
						? disabled
							? colors.grey4
							: colors.primary
						: colors.grey5,
			},
			style,
		],
		[variant, disabled]
	);

	const textLabelStyle: StyleProp<TextStyle> = React.useMemo(
		() => [styles.textLabel, , textStyle],
		[variant, textStyle]
	);

	return (
		<View style={styles.root}>
			<RNBounce
				{...props}
				disabled={disabled}
				onPress={onPress}
				style={buttonContainerStyle}
			>
				{!loading ? (
					<Text
						color={variant === 'primary' ? colors.white : colors.black}
						center
						fontFamily='DMSansSemiBold'
						style={textLabelStyle}
					>
						{textLabel}
					</Text>
				) : (
					<ActivityIndicator
						animating={loading}
						size='large'
						color={variant === 'primary' ? colors.white : colors.primary}
					/>
				)}
			</RNBounce>
		</View>
	);
};

interface RNBounceProps extends PressableProps {
	bounceEffectIn?: number;
	bounceEffectOut?: number;
	bounceVelocityIn?: number;
	bounceVelocityOut?: number;
	bouncinessIn?: number;
	bouncinessOut?: number;
	useNativeDriver?: boolean;
	style?: ViewStyleProp;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface IState {
	bounceValue: Animated.Value;
}

export class RNBounce extends React.Component<RNBounceProps, IState> {
	constructor(props: RNBounceProps) {
		super(props);
		this.state = {
			bounceValue: new Animated.Value(1),
		};
	}

	bounceAnimation = (value: number, velocity: number, bounciness: number) => {
		const {useNativeDriver = true} = this.props;
		Animated.spring(this.state.bounceValue, {
			toValue: value,
			velocity,
			bounciness,
			useNativeDriver,
		}).start();
	};

	render() {
		const {
			bounceEffectIn = 0.93,
			bounceEffectOut = 1,
			bounceVelocityIn = 0.1,
			bounceVelocityOut = 0.4,
			bouncinessIn = 0,
			bouncinessOut = 0,
			children,
			style,
			onPress,
		} = this.props;
		return (
			<AnimatedPressable
				{...this.props}
				style={[{transform: [{scale: this.state.bounceValue}]}, style]}
				onPressIn={() => {
					this.bounceAnimation(bounceEffectIn, bounceVelocityIn, bouncinessIn);
				}}
				onPressOut={() => {
					this.bounceAnimation(
						bounceEffectOut,
						bounceVelocityOut,
						bouncinessOut
					);
				}}
				onPress={onPress}
			>
				{children}
			</AnimatedPressable>
		);
	}
}
