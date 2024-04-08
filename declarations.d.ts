declare module '*.svg' {
	import {SvgProps} from 'react-native-svg';
	import * as React from 'react';
	const content: React.FC<SvgProps>;
	export default content;
}

declare module '*.jpg' {
	import {ImageSourcePropType} from 'react-native';
	const content: ImageSourcePropType;
	export default content;
}

declare module '*.png' {
	import {ImageSourcePropType} from 'react-native';
	const content: ImageSourcePropType;
	export default content;
}
