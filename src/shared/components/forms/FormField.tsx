import * as React from 'react';
import {type FormikValues, useFormikContext} from 'formik';

/**
 * ? Local & Shared Imports
 */
import {Input, type InputProps} from '@shared-components/input';
import ErrorMessage from './ErrorMessage';

export type FormFieldProps = {
	field: string;
} & InputProps;

export const FormField: React.FC<FormFieldProps> = ({field, ...rest}) => {
	const {errors, handleChange, handleBlur, touched, values} =
		useFormikContext<FormikValues>();

	const visible = Boolean(touched[field]) && Boolean(errors[field]);
	const error = String(errors[field]) ?? undefined;

	return (
		<>
			<Input
				error={error}
				onChangeText={handleChange(field)}
				onBlur={handleBlur(field)}
				value={values[field]}
				touched={Boolean(touched[field])}
				borderError={visible}
				{...rest}
			/>
			<ErrorMessage visible={visible} error={error} />
		</>
	);
};
