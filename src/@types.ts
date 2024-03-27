import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type ViewStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
export type TextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

export enum COLLECTIONS_NAME {
	IMAGE = 'FIT-FAM-USERS-AVATAR',
	USERS = 'FIT-FAM-USERS',
	USERNAMES = 'FIT-FAM-USERS-USERNAMES',
}

export type UserCollectionType = {
	user_id: string;
	image: string;
	phone?: string;
	first_name: string;
	last_name: string;
	username: string;
	id: string;
};
