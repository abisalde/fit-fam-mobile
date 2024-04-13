export type RegisterFormType = {
	email: string;
	password: string;
	confirm_password: string;
};

export type LoginFormType = {
	email: string;
	password: string;
};

export type ProfileUpdateType = {
	first_name: string;
	last_name: string;
	username: string;
	phone_number?: string;
	phone?: string;
};

export type AdminProfileType = {
	company_name: string;
	logo: string;
	phone: string | undefined;
	id: string;
	isAdmin: boolean;
};

export type NewPasswordType = {
	old_password: string;
	new_password: string;
	confirm_new_password: string;
};
