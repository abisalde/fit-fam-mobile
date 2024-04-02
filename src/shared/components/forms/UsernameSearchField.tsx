import * as React from 'react';
import {type FormikValues, useFormikContext} from 'formik';

/**
 * ? Local & Shared Imports
 */
import {Input} from '@shared-components/input';
import ErrorMessage from './ErrorMessage';

import {useUsernameSearch} from '@hooks';

import {type FormFieldProps} from './FormField';

interface UsernameSearchFieldProps extends FormFieldProps {
	usernameValue: string;
	setUsernameValue: React.Dispatch<React.SetStateAction<string>>;
}

export const UsernameSearchField: React.FC<UsernameSearchFieldProps> = ({
	field,
	usernameValue,
	setUsernameValue,
	...rest
}) => {
	const {errors, handleChange, handleBlur, touched, setFieldError} =
		useFormikContext<FormikValues>();

	const {searchOptions, searchUsername} = useUsernameSearch();

	const visible = Boolean(touched[field]) && Boolean(errors[field]);
	const error =
		searchOptions.error.length > 0
			? searchOptions.error
			: String(errors[field]) ?? undefined;

	const handleSearch = React.useCallback(
		async (val: string) => {
			setUsernameValue(val?.toLocaleLowerCase());
			await searchUsername(val);

			if (!searchOptions.isValid) {
				setFieldError(field, searchOptions.error);
			} else {
				handleChange(field)(val);
			}
		},
		[searchOptions]
	);

	return (
		<>
			<Input
				error={error}
				onChangeText={handleSearch}
				onBlur={handleBlur(field)}
				value={usernameValue}
				touched={Boolean(touched[field])}
				borderError={visible || searchOptions.error.length > 0}
				{...rest}
			/>
			<ErrorMessage
				visible={visible || searchOptions.error.length > 0}
				error={error}
			/>
		</>
	);
};
