import {DimensionValue, StyleProp, View, ViewStyle} from 'react-native';

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

type SeparatorProps = {
	height?: number;
	width?: number | DimensionValue;
	style?: CustomStyleProp;
};

export const Separator = ({
	height = 10,
	width = '100%',
	style,
}: SeparatorProps) => {
	return <View style={[style, {height, width}]} />;
};
