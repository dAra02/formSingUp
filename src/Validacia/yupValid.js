import * as yup from 'yup';

export const fieldsScheme = yup.object().shape({
	email: yup.string().required('Требуется email'),
	password: yup
		.string()
		.matches(/^[\w_]*$/, 'Должны использоваться любые буквы, цифры и знак _')
		.required('Требуется пароль')
		.max(20, 'Длинна пароля не должна превышать 20 символов.')
		.min(5, 'Длинна пароля должна быть не меньше 5 символов.'),
	povtorPassword: yup
		.string()
		.required('Требуется подтвердить пароль.')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать.'),
});
