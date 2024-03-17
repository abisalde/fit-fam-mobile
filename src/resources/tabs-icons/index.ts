import Analytics from './analytics.svg';
import AnalyticsOutline from './analytics-outline.svg';
import Communities from './communities.svg';
import CommunitiesOutline from './communties-outline.svg';
import Goals from './goals.svg';
import GoalsOutline from './goals-outline.svg';
import Home from './home.svg';
import HomeOutline from './home-outline.svg';
import ActiveIcon from '../images/icon.svg';

export const TabsIcon = {
	Analytics,
	AnalyticsOutline,
	Communities,
	CommunitiesOutline,
	Goals,
	GoalsOutline,
	Home,
	HomeOutline,
	ActiveIcon,
};

// if

export const tabs_routes = [
	{
		id: 'fit-fam-app-home',
		label: 'Home',
		route: 'index',
		Icon: TabsIcon.Home,
		IconOutline: TabsIcon.HomeOutline,
	},
	{
		id: 'fit-fam-app-analytics',
		label: 'Analytics',
		route: 'analytics',
		Icon: TabsIcon.Analytics,
		IconOutline: TabsIcon.AnalyticsOutline,
	},
	{
		id: 'fit-fam-app-goals',
		label: 'Goals',
		route: 'goals',
		Icon: TabsIcon.Goals,
		IconOutline: TabsIcon.GoalsOutline,
	},
	{
		id: 'fit-fam-app-communities',
		label: 'Communities',
		route: 'communities',
		Icon: TabsIcon.Communities,
		IconOutline: TabsIcon.CommunitiesOutline,
	},
];

export const TabScreenConfigs = {
	home: {
		name: 'index',
		options: {
			title: 'Home',
		},
	},
	analytics: {
		name: 'analytics',
		options: {
			title: 'Analytics',
		},
	},
	goals: {
		name: 'goals',
		options: {
			title: 'Goals',
		},
	},
	communities: {
		name: 'communities',
		options: {
			title: 'Communities',
		},
	},
};
