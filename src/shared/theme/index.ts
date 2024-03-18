import {DefaultTheme, ExtendedTheme} from '@react-navigation/native';

export const palette: PaletteColors = {
	primary: '#AA3DFF',
	secondary: '#CF92FF',
	text: '#0A0A0A',
	text2: '#1D2125',
	white: '#FFFFFF',
	transparent: 'transparent',
	black: '#141414',
	black3: '#282828',
	grey: '#333333',
	grey2: '#4F4F4F',
	grey3: '#757575',
	grey4: '#BDBDBD',
	grey5: '#E7E7E7',
	lightGray: '#828282',
	gradientOne: '#6BB8FF',
	gradientTwo: '#3AA1FF',
	info: '#2F80ED',
	success: '#27AE60',
	warning: '#E2893B',
	error: '#EB5757',
	separator: 'rgb(194, 194, 195)',
	highlight: 'rgb(199, 198, 203)',
	blackOverlay: 'rgba(0,0,0,0.6)',
	background: '#F5F7FB',
	dynamicBackground: '#fff',
	darkBg: '#00003D',
	borderColor: '#BDBDBD',
	OTPBorderColor: '#D4DDDF',
	borderColorDark: '#333942',
	textPlaceholder: '#BDBDBD',
	shadow: '#F5F5FF',
	tabBgColor: '#F1F1F1',
	logoText: '#17395C',
	purpleLight: 'rgba(93, 59, 240, 0.2)',
	purpleD: '#928FFF',
	passwordIcon: '#CCD2E3',
};

export const LightTheme: ExtendedTheme = {
	dark: false,
	colors: {
		...DefaultTheme.colors,
		...palette,
	},
};

export interface PaletteColors {
	primary: string;
	secondary: string;
	text: string;
	text2: string;
	white: string;
	transparent: string;
	black: string;
	black3: string;
	grey: string;
	grey2: string;
	grey3: string;
	grey4: string;
	grey5: string;
	lightGray: string;
	gradientOne: string;
	gradientTwo: string;
	info: string;
	success: string;
	warning: string;
	error: string;
	separator: string;
	highlight: string;
	blackOverlay: string;
	background: string;
	dynamicBackground: string;
	darkBg: string;
	borderColor: string;
	OTPBorderColor: string;
	borderColorDark: string;
	textPlaceholder: string;
	shadow: string;
	tabBgColor: string;
	logoText: string;
	purpleLight: string;
	purpleD: string;
	passwordIcon: string;
}
