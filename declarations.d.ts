declare module '*.svg' {
	import {SvgProps} from 'react-native-svg';
	import * as React from 'react';
	const content: React.FC<SvgProps>;
	export default content;
}
