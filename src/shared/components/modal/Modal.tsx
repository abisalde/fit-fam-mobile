import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {
	View,
	Modal as RNModal,
	Keyboard,
	TouchableWithoutFeedback,
	GestureResponderEvent,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

/**
 * ? Local & Shared Imports
 */
import createStyles from './modal.styles';
import {ViewStyleProp} from '@types';

interface ModalProps {
	visible: boolean;
	onDismiss: (e: GestureResponderEvent) => void;
	type?: 'slide' | 'none' | 'fade';
	style?: ViewStyleProp;
}

export const Modal: React.FC<ModalProps & React.PropsWithChildren> = ({
	children,
	onDismiss,
	visible,
	style,
	type = 'none',
}) => {
	const theme = useTheme();
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const opacity = useSharedValue(0);

	const backdropAnimatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value * 0.6,
	}));

	React.useLayoutEffect(() => {
		opacity.value = withTiming(visible ? 1 : 0);
		if (!visible) Keyboard.dismiss();
	}, [visible]);

	if (!visible) return null;

	return (
		<RNModal
			transparent
			visible={visible}
			accessibilityLabel='Dialog'
			accessibilityRole='alert'
			animationType={type}
		>
			<View style={[styles.root, style]}>
				<TouchableWithoutFeedback onPress={onDismiss}>
					<Animated.View
						style={[styles.backdropOverlay, backdropAnimatedStyle]}
					/>
				</TouchableWithoutFeedback>
				{children}
			</View>
		</RNModal>
	);
};
