import * as React from 'react';
import {GestureResponderEvent, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/***
 * ? Local & Shared Imports
 */
import createStyles from './component.styles';

import {Text} from '@shared-components/text-wrapper';

type IconName = 'image' | 'info' | 'logout' | 'password';

interface NavigateCardProps {
	iconName?: IconName;
	title: string;
	action: (e: GestureResponderEvent) => void;
}

export const NavigateCard: React.FC<NavigateCardProps> = ({
	action,
	iconName,
	title,
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	return (
		<View style={styles.navigateCardContainer}>
			<View style={styles.navigateCardLeftContainer}>
				<View style={styles.navigateCardIconContainer}>
					<MaterialIcons name={iconName} size={24} color={colors.secondary} />
				</View>
				<Text left h3 fontFamily='DMSansMedium' color={colors.black}>
					{title}
				</Text>
			</View>
			<TouchableOpacity
				accessibilityRole='button'
				accessibilityLabel='Navigate when pressed'
				activeOpacity={0.75}
				style={styles.navigateCardRightContainer}
				onPress={action}
			>
				<MaterialIcons
					name='arrow-forward-ios'
					size={20}
					color={colors.grey3}
				/>
			</TouchableOpacity>
		</View>
	);
};
