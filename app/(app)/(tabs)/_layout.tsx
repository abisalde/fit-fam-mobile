import * as React from 'react';
import {Tabs} from 'expo-router';
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import Animated, {
	useAnimatedStyle,
	withTiming,
	Easing,
} from 'react-native-reanimated';

/**
 * ? Local & Shared Imports
 */
import {Text} from '@shared-components/text-wrapper';

import {TabScreenConfigs, TabsIcon} from '@resources/tabs-icons';
import {fontPixel, heightPixel, pixelSizeVertical} from '@utils/normalize';

import {palette} from '@app-theme';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{headerShown: false}}
			tabBar={(props) => <TabsBar {...props} />}
		>
			<Tabs.Screen {...TabScreenConfigs.home} />
			<Tabs.Screen {...TabScreenConfigs.analytics} />
			<Tabs.Screen {...TabScreenConfigs.goals} />
			<Tabs.Screen {...TabScreenConfigs.communities} />
		</Tabs>
	);
}

const TabsBar: React.FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	return (
		<View style={styles.tabBar}>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];
				const name = route.name;
				const focused = state.index === index;

				const handleNavigation = (e: GestureResponderEvent) => {
					e.stopPropagation();
					navigation.navigate(route.name, route.params);
				};

				const onLongPress = (e: GestureResponderEvent) => {
					e.stopPropagation();
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				const getAnimatedStyle = () => {
					return useAnimatedStyle(() => {
						return {
							transform: [
								{
									scale: withTiming(focused ? 1.25 : 1, {
										duration: 500,
										easing: Easing.inOut(Easing.ease),
									}),
								},
							],
						};
					});
				};
				return (
					<Pressable
						key={route.key + index.toString()}
						accessibilityRole='button'
						accessibilityLabel={options.title ?? route.name}
						style={[styles.tab, focused && styles.activeTab]}
						onPress={handleNavigation}
						onLongPress={onLongPress}
					>
						{focused ? (
							<Animated.View style={[styles.activeIcon, getAnimatedStyle()]}>
								<LinearGradient
									colors={[palette.primary, palette.gradientTwo]}
									start={{x: 0, y: 0}}
									end={{x: 1, y: 0}}
									style={styles.icon}
								>
									<Icon focused={focused} name={name} />
								</LinearGradient>
							</Animated.View>
						) : (
							<Icon focused={focused} name={name} />
						)}
						<Text center fontFamily='DMSansThin' style={styles.title}>{`${
							focused ? '' : options.title
						}`}</Text>
					</Pressable>
				);
			})}
		</View>
	);
};

type TabItemProps = {
	focused: boolean;
	name: string;
};

const Icon: React.FC<TabItemProps> = ({focused, name}) => {
	let Icon;

	switch (name) {
		case 'index':
			Icon = focused ? <TabsIcon.Home /> : <TabsIcon.HomeOutline />;
			break;
		case 'analytics':
			Icon = focused ? <TabsIcon.Analytics /> : <TabsIcon.AnalyticsOutline />;
			break;
		case 'goals':
			Icon = focused ? <TabsIcon.Goals /> : <TabsIcon.GoalsOutline />;
			break;
		case 'communities':
			Icon = focused ? (
				<TabsIcon.Communities />
			) : (
				<TabsIcon.CommunitiesOutline />
			);
			break;
		default:
			break;
	}
	return Icon;
};
const styles = StyleSheet.create({
	tabBar: {
		height: 80,
		backgroundColor: palette.tabBgColor,
		shadowColor: palette.black3,
		shadowOffset: {
			height: 1,
			width: 0,
		},
		shadowOpacity: 0.5,
		elevation: 10,
		borderTopWidth: 0.1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		position: 'relative',
		paddingTop: heightPixel(15),
	},
	tab: {
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	icon: {
		width: 55,
		height: 55,
		borderRadius: 27.5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	activeTab: {
		position: 'relative',
		top: -30,
	},
	activeIcon: {
		borderTopWidth: 8,
		borderRadius: 35,
		borderColor: palette.tabBgColor,
		backgroundColor: palette.tabBgColor,
		paddingHorizontal: 5,
	},
	title: {
		fontSize: fontPixel(12),
		lineHeight: pixelSizeVertical(22),
		color: palette.grey3,
	},
});
