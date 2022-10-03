import * as yup from 'yup';

export const yupUserRegistrationSchema = yup.object({
	email: yup
		.string()
		.email()
		.required(),
	username: yup
		.string(),
	password: yup
		.string()
		.min(8)
		.max(64)
		.required()
});

export const yupUserLoginSchema = yup.object({
	email: yup
		.string()	
		.email(),
		password: yup
		.string()
		.required()
});