export const maskEmail = (email: string): string => {
	const [local, domain] = email.split('@');

	let emailId = '';
	let emailDomain = '';
	let emailTDD = '';
	let result = '';

	try {
		if (local.length > 0) {
			emailId = local;
		}
		if (domain.length > 0) {
			const [name, tdd] = domain.split('.');
			emailDomain = name;
			emailTDD = tdd;
		}

		if (local.length < 4) {
			result = `${local.charAt(0)}${'*'.repeat(6)}@${'*'.repeat(
				5
			)}.${emailTDD}`;
			return result;
		}

		const maskedLocal = local.slice(0, 2) + '*'.repeat(6) + local.slice(-2);
		const maskedDomain = `${'*'.repeat(5)}.${emailTDD}`;

		result = `${maskedLocal}@${maskedDomain}`;
	} catch (error) {
		throw new Error(`Masked Email:${error}`);
	}

	return result;
};
