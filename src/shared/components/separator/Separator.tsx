import {DimensionValue, View} from 'react-native';

import {pixelSizeVertical} from '@utils/normalize';

import type {ViewStyleProp} from '@types';

type SeparatorProps = {
	height?: number;
	width?: number | DimensionValue;
	style?: ViewStyleProp;
};

export const Separator = ({
	height = 10,
	width = '100%',
	style,
}: SeparatorProps) => {
	return <View style={[style, {height: pixelSizeVertical(height), width}]} />;
};
