import * as React from 'react';
import {GestureResponderEvent} from 'react-native';
import {useTheme} from '@react-navigation/native';
/**
 * ? Local & Shared Imports
 */
import createStyles from './component.styles';

import {Button} from '@shared-components/button';
import {Card} from '@shared-components/card';
import {Text} from '@shared-components/text-wrapper';
import {Separator} from '@shared-components/separator';

import {FontKeys} from '@utils/font-keys';
import {UserCollectionType} from '@types';

interface UpdateProfileCardProps {
	onPress: (e: GestureResponderEvent) => void;
	user?: UserCollectionType;
	loading?: boolean;
}

export const UpdateProfileCard: React.FC<UpdateProfileCardProps> = ({
	loading = false,
	onPress,
	user,
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	return loading ? null : typeof user === 'undefined' ||
	  user?.first_name === undefined ? (
		<Card style={styles.profileUpdateCard}>
			<Text left color={colors.dark} fontFamily={FontKeys.DMSansSemiBold} h3>
				Update your profile
			</Text>
			<Separator height={16} />
			<Text center h2 color={colors.primary} fontFamily={FontKeys.DMSansMedium}>
				Welcome to FITFAM Community 👋️
			</Text>
			<Separator height={10} />
			<Text center color={colors.grey3}>
				You can start by updating your profile
			</Text>
			<Separator height={18} />

			<Button
				onPress={onPress}
				accessibilityRole='button'
				accessibilityLabel='Navigate to update your profile'
				textLabel='Update now'
				textStyle={styles.textButtonStyle}
			/>
		</Card>
	) : null;
};
