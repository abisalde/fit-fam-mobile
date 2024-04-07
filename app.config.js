export default {
	name: 'FIT FAM MOBILE',
	slug: 'fittfammobile',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/images/icon.png',
	scheme: 'myapp',
	userInterfaceStyle: 'automatic',
	splash: {
		image: './assets/images/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
		googleServicesFile: './assets/GoogleService-Info.plist',
		bundleIdentifier: 'com.abisalde.fittfammobile',
	},
	android: {
		googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
		package: 'com.abisalde.fittfammobile',
		adaptiveIcon: {
			foregroundImage: './assets/images/adaptive-icon.png',
			backgroundColor: '#ffffff',
		},
		permissions: [
			'android.permission.CAMERA',
			'android.permission.RECORD_AUDIO',
		],
	},
	web: {
		bundler: 'metro',
		output: 'static',
		favicon: './assets/images/favicon.png',
	},
	plugins: [
		'expo-router',
		'expo-secure-store',
		[
			'expo-camera',
			{
				cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
				microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
				recordAudioAndroid: true,
			},
		],
		[
			'expo-image-picker',
			{
				photoPermission:
					'Fit Fam accesses your photos to let people in the community put a face to the name and share them with people in the community',
			},
		],
	],
	experiments: {
		typedRoutes: true,
	},
	owner: 'abisalde',
	extra: {
		router: {
			origin: false,
		},
		eas: {
			projectId: '50bae4ac-e365-4201-9f57-7f5fec305379',
		},
	},
};
