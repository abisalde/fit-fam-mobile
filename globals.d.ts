import {theme} from './src/shared/theme/index';

declare module '@react-navigation/native' {
	export type ExtendedTheme = typeof theme;
	export function useTheme(): ExtendedTheme;
}

declare module '*.svg' {
	import {SvgProps} from 'react-native-svg';
	import * as React from 'react';
	const content: React.FC<SvgProps>;
	export default content;
}
