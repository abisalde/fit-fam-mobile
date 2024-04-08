import * as React from 'react';
import {Animated, FlatList, StyleSheet, View, ViewToken} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import {router} from 'expo-router';
/**
 * ? Local & Shared Imports
 */
import {OnboardingItem, Paginator} from './components';

import {Button} from '@shared-components/button';
import {ScreenWrapper} from '@shared-components/screen-wrapper';
import {Separator} from '@shared-components/separator';

import {updateUserOnboarding, useGlobalState} from '@lib/global-reducer';

import {palette} from '@app-theme';
import {
	heightPixel,
	pixelSizeHorizontal,
	SCREEN_HEIGHT,
	SCREEN_WIDTH,
} from '@utils/normalize';

/**
 * ? Assets
 */
import {Image} from '@resources/images';

type info = {
	viewableItems: ViewToken[];
	changed: ViewToken[];
};

export const OnboardingScreen = () => {
	const {dispatch} = useGlobalState();

	const [currentIndex, setCurrentIndex] = React.useState(0);

	const scrollX = React.useRef(new Animated.Value(0)).current;
	const flatListRef = React.useRef<null | FlatList>(null);
	const itemsChanged = React.useRef(({viewableItems}: info) => {
		setCurrentIndex(viewableItems[0].index as number);
	}).current;
	const flatConfig = React.useRef({
		viewAreaCoveragePercentThreshold: 50,
	}).current;

	const scrollTo = React.useCallback(() => {
		if (currentIndex < mock_data.length - 1) {
			flatListRef.current?.scrollToIndex({index: currentIndex + 1});
		} else {
			updateUserOnboarding(dispatch, true);
			router.push('/');
		}
	}, [currentIndex, dispatch]);

	return (
		<>
			<View style={styles.statusBar} />
			<StatusBar animated backgroundColor={palette.primary} translucent />
			<ScreenWrapper style={styles.root}>
				<View style={styles.container}>
					<FlatList
						keyExtractor={(item, idx) => item + idx.toString()}
						horizontal={true}
						style={{zIndex: 20}}
						ref={flatListRef}
						showsHorizontalScrollIndicator={false}
						data={mock_data}
						pagingEnabled={true}
						bounces={false}
						renderItem={({item}) => <OnboardingItem {...item} />}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: {x: scrollX},
									},
								},
							],
							{useNativeDriver: false}
						)}
						scrollEventThrottle={32}
						onViewableItemsChanged={itemsChanged}
						viewabilityConfig={flatConfig}
					/>
				</View>
				<View style={styles.bottom} />
				<View style={styles.bottomAction}>
					<Paginator data={mock_data} scrollX={scrollX} />
					<Separator height={20} />
					<Button
						textLabel='Next'
						onPress={scrollTo}
						accessibilityLabel='Press to go next page'
						accessibilityRole='button'
					/>
				</View>
			</ScreenWrapper>
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: palette.primary,
		paddingHorizontal: 0,
	},
	statusBar: {
		flex: 0,
		backgroundColor: palette.primary,
		height: 40,
	},
	container: {
		flex: 1,
		zIndex: 6,
		paddingBottom: pixelSizeHorizontal(40),
	},
	bottom: {
		zIndex: 5,
		justifyContent: 'flex-end',
		backgroundColor: palette.white,
		height: SCREEN_HEIGHT / 2.3,
		borderTopRightRadius: SCREEN_WIDTH / 1.5,
		borderTopLeftRadius: SCREEN_WIDTH / 1.5,
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	bottomAction: {
		justifyContent: 'flex-end',
		position: 'relative',
		zIndex: 10,
		paddingBottom: heightPixel(35),
		paddingHorizontal: pixelSizeHorizontal(16),
	},
});

const mock_data = [
	{
		id: 'onboarding_data_0012',
		title:
			'Monitor your fitness level  and track how many calories you have lost overtime',
		Icon: Image.OnboardingImageOne,
	},
	{
		id: 'onboarding_data_0022',
		title: 'Set fitness goals and smash them easily with our easy to use tool',
		Icon: Image.OnboardingImageTwo,
	},
	{
		id: 'onboarding_data_0032',
		title:
			'Track your progress by through the analytics provided in the fit fam app',
		Icon: Image.OnboardingImageThree,
	},
];
