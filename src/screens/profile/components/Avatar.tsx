import * as React from 'react';
import {Image, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

/***
 * ? Local & Shared Imports
 */

import createStyles from './component.styles';

interface AvatarProps {
	image: string;
}

export const Avatar: React.FC<AvatarProps> = ({image}) => {
	const theme = useTheme();
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	return (
		<View style={styles.imageAvatarContainer}>
			<Image
				source={{uri: image}}
				resizeMode='cover'
				style={styles.imageAvatar}
			/>
		</View>
	);
};
