import * as Yup from 'yup';

/**
 * ? Local Imports
 */
import {RegisterFormType, LoginFormType, ProfileUpdateType} from './model';

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
		company_name: Yup.string()
			.trim()
			.min(3, 'Organization name must be more than 3 characters')
			.max(50, 'Organization must not be more than 50 characters')
			.required('Organization name is required')
			.label('Organization name'),
		logo: Yup.string().label('Organization logo'),
		phone: Yup.string()
			.matches(/^(\+?44|0)(\d{10}|\d{9})$/, 'Invalid UK Phone Number')
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
