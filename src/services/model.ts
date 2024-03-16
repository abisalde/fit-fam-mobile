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
	company_name: string;
	logo?: string;
	phone?: string;
};

export type AdminProfileType = {
	company_name: string;
	logo: string;
	phone: string | undefined;
	id: string;
	isAdmin: boolean;
};
