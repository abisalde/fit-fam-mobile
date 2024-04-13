import * as React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

/**
 *
 * ? Local & Shared Imports
 */
import createStyles from './component.styles';

import {Button} from '@shared-components/button';
import {Modal} from '@shared-components/modal';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

interface ChangePasswordModalProps {
	loading: boolean;
	openCloseModal: () => void;
	navigatePassword: (e: GestureResponderEvent) => void;
	visible: boolean;
	sendEmail: (e: GestureResponderEvent) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
	loading,
	openCloseModal,
	navigatePassword,
	sendEmail,
	visible,
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	return (
		<Modal
			visible={visible}
			onDismiss={openCloseModal}
			style={styles.deleteModalRoot}
		>
			<View style={styles.deleteModalContainer}>
				<Text center fontFamily='DMSansSemiBold' color={colors.black} h2>
					Are you able to recall your old password?
				</Text>
				<Separator height={10} />
				<Text h4 center fontFamily='DMSansLight' color={colors.black}>
					Please let us know if you remember your old password by selecting{' '}
					<Text h3 center color={colors.success} fontFamily='DMSansSemiBold'>
						YES
					</Text>{' '}
					or if you don't remember your old password select{' '}
					<Text h3 center color={colors.grey3} fontFamily='DMSansSemiBold'>
						NO
					</Text>{' '}
					and we will send you an email to reset your password.
				</Text>
				<Separator height={25} />
				<Button
					accessibilityRole='button'
					accessibilityLabel='Navigate to password screen'
					textLabel='Yes'
					style={{backgroundColor: colors.success}}
					onPress={navigatePassword}
				/>
				<Separator height={16} />
				<Button
					accessibilityRole='link'
					accessibilityLabel='Send email to reset password'
					textLabel='No'
					variant='secondary'
					onPress={sendEmail}
					loading={loading}
				/>
			</View>
		</Modal>
	);
};
