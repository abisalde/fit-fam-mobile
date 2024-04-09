/** CORE */
import React from 'react';
import RNText, {IRNTextProps} from '@freakycoder/react-native-custom-text';

/**
 * ? Local Imports
 */
import {FontKeys} from '@utils/font-keys';

type FontKeysType = keyof typeof FontKeys;

interface ITextWrapperProps extends IRNTextProps {
	color?: string;
	fontFamily?: FontKeysType;
	children?: React.ReactNode;
}

export const Text: React.FC<ITextWrapperProps> = ({
	fontFamily = FontKeys.DMSansRegular,
	color = '#141414',
	children,
	...rest
}) => {
	return (
		<RNText fontFamily={fontFamily} color={color} {...rest}>
			{children}
		</RNText>
	);
};
