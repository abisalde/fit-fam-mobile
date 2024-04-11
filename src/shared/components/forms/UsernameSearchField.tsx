import * as React from 'react';
import {type FormikValues, useFormikContext} from 'formik';

/**
 * ? Local & Shared Imports
 */
import {Input} from '@shared-components/input';
import ErrorMessage from './ErrorMessage';

import {useUsernameSearch} from '@hooks';

import {type FormFieldProps} from './FormField';

export const UsernameSearchField: React.FC<FormFieldProps> = ({
	field,
	...rest
}) => {
	const {errors, handleChange, handleBlur, touched, setFieldError, values} =
		useFormikContext<FormikValues>();

	const {searchOptions, searchUsername} = useUsernameSearch();

	const visible = Boolean(touched[field]) && Boolean(errors[field]);
	const error =
		searchOptions.error.length > 0
			? searchOptions.error
			: String(errors[field]) ?? undefined;

	const handleSearch = React.useCallback(
		async (val: string) => {
			await searchUsername(val);

			if (!searchOptions.isValid) {
				setFieldError(field, searchOptions.error);
			}
		},
		[searchOptions]
	);

	return (
		<>
			<Input
				autoCapitalize='none'
				error={error}
				onChangeText={(val) => {
					handleChange(field)(val);
					handleSearch(val);
				}}
				onBlur={handleBlur(field)}
				value={values[field]}
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
