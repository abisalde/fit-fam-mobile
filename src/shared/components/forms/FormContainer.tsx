import {Formik, FormikHelpers} from 'formik';

interface FormContainerProps<T> {
	initialValues: T;
	validationSchema: object;
	onSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void>;
	children: React.ReactNode;
}

export const FormContainer = <T extends {}>({
	children,
	initialValues,
	onSubmit,
	validationSchema,
}: FormContainerProps<T>) => {
	return (
		<Formik
			validateOnMount={true}
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => <>{children}</>}
		</Formik>
	);
};
