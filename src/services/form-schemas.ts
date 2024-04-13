import * as Yup from 'yup';

/**
 * ? Local Imports
 */
import {
	RegisterFormType,
	LoginFormType,
	ProfileUpdateType,
	NewPasswordType,
} from './model';

export const RegisterFormSchema: Yup.Schema<RegisterFormType> =
	Yup.object().shape({
		email: Yup.string()
			.lowercase()
			.trim()
			.email('Enter a valid email address')
			.matches(
				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
				'Invalid email address'
			)
			.required('Email is required')
			.label('Email'),
		password: Yup.string()
			.trim()
			.min(8, 'Password must be at least 8 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			)
			.required('Password is required')
			.label('Password'),

		confirm_password: Yup.string()
			.trim()
			.oneOf([Yup.ref('password'), undefined], 'Passwords must match')
			.required('Confirm Password is required')
			.label('Confirm Password'),
	});

export const LoginFormSchema: Yup.Schema<LoginFormType> = Yup.object().shape({
	email: Yup.string()
		.lowercase()
		.trim()
		.email('Enter a valid email address')
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			'Invalid email address'
		)
		.required('Email is required')
		.label('Email'),
	password: Yup.string()
		.trim()
		.required('Password is required')
		.label('Password'),
});

export const ProfileUpdateSchema: Yup.Schema<ProfileUpdateType> =
	Yup.object().shape({
		first_name: Yup.string()
			.trim()
			.matches(
				/^[A-Za-z]+$/,
				'First name must contain only alphabetic characters'
			)
			.min(3, 'First name must be more than 3 letters')
			.max(30, 'First name must not be more than 30 characters')
			.required('First name is required')
			.label('First name'),

		last_name: Yup.string()
			.trim()
			.matches(
				/^[A-Za-z]+$/,
				'Last name must contain only alphabetic characters'
			)
			.min(3, 'Last name must be more than 3 letters')
			.max(30, 'Last name must not be more than 30 characters')
			.required('Last name is required')
			.label('Last name'),

		username: Yup.string()
			.trim()
			.lowercase()
			.matches(
				/^[a-zA-Z0-9]+$/,
				'Username must contain only alphanumeric characters and no trailing spaces'
			)
			.min(3, 'Username must be more than 3 characters')
			.max(50, 'Username must not be more than 50 characters')
			.required('Username is required')
			.label('Username'),

		phone_number: Yup.string()
			.min(10, 'Phone number must be at least 10 digits')
			.max(11, 'Phone number must not be more than 11 digits')
			.matches(/^\d+$/, 'Phone number must contain only numbers')
			.label('Phone Number'),
	});

export const imageValidationSchema = Yup.object().shape({
	logo: Yup.mixed()
		.required('You must select an image')
		.test('fileSize', 'File size is too large', function (value) {
			if (value instanceof File) {
				return value.size <= 10485760; // 10MB
			} else {
				return true;
			}
		})
		.test('fileType', 'Unsupported file format', function (value) {
			if (value instanceof File) {
				return (
					['image/png', 'image/jpeg', 'image/jpg'].includes(value.type) ||
					/\.(png|jpe?g)$/i.test(value.name)
				);
			} else {
				return true;
			}
		}),
});

export const NewPasswordFormSchema: Yup.Schema<NewPasswordType> =
	Yup.object().shape({
		old_password: Yup.string()
			.trim()
			.min(8, 'Password must be at least 8 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			)
			.required('')
			.label('Old Password'),
		new_password: Yup.string()
			.trim()
			.min(8, 'Password must be at least 8 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			)
			.required('New Password is required')
			.label('New Password'),

		confirm_new_password: Yup.string()
			.trim()
			.oneOf([Yup.ref('new_password'), undefined], 'Passwords must match')
			.required('Confirm New Password is required')
			.label('Confirm New Password'),
	});
