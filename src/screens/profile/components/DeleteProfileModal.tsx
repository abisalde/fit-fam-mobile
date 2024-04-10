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
import {Input} from '@shared-components/input';

interface DeleteProfileModalProps {
	deleting: boolean;
	deleteConfirmation: () => void;
	deleteInProgress: (e: GestureResponderEvent) => void;
	handlePasswordChange: (text: string) => void;
	password: string;
	passwordState: boolean;
	openCloseModal: () => void;
	visible: boolean;
}

export const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({
	deleting,
	deleteConfirmation,
	deleteInProgress,
	handlePasswordChange,
	password,
	passwordState,
	openCloseModal,
	visible,
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const disableBtn = React.useMemo(() => {
		return deleting || (passwordState && password.length === 0);
	}, [deleting, password, passwordState]);

	return (
		<Modal
			visible={visible || deleting || passwordState}
			onDismiss={deleting ? () => {} : openCloseModal}
			style={styles.deleteModalRoot}
		>
			<View style={styles.deleteModalContainer}>
				<Text center fontFamily='DMSansSemiBold' color={colors.black} h2>
					{passwordState
						? 'Please enter your password below'
						: 'Are you sure you want to delete your account?'}
				</Text>
				<Separator height={10} />
				<Text h4 center fontFamily='DMSansLight' color={colors.black}>
					{passwordState
						? 'We need your password to delete your account'
						: 'This action is irreversible and will delete all your data permanently.'}
				</Text>
				<Separator height={25} />
				{passwordState ? (
					<>
						<Input
							autoComplete='password'
							autoFocus
							onChangeText={handlePasswordChange}
							value={password}
							placeholder='Enter your password'
						/>
						<Separator height={25} />
					</>
				) : null}
				<Button
					textLabel={passwordState ? 'Confirm Delete' : 'Yes'}
					loading={deleting}
					disabled={disableBtn}
					onPress={passwordState ? deleteInProgress : deleteConfirmation}
					style={passwordState ? {} : styles.deleteYesButton}
				/>
				<Separator height={16} />
				{passwordState ? null : (
					<Button textLabel='No' variant='secondary' onPress={openCloseModal} />
				)}
			</View>
		</Modal>
	);
};
