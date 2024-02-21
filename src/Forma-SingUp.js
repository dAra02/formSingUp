import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './forma.css';
import style from './Forma-SingUp.module.css';
import { fieldsScheme } from './Validacia';

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			povtorPassword: '',
		},
		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const povtorPasswordError = errors.povtorPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
		reset();
	};

	return (
		<div className={style.App}>
			<form onSubmit={handleSubmit(onSubmit)} className={style.formContur}>
				<div className={style.singUp}>Sign Up</div>

				<div className={style.inputBox}>
					<input type="email" name="email" placeholder="Введите email" {...register('email')}></input>
					{<span>{emailError}</span>}
				</div>

				<div className={style.inputBox}>
					<input type="password" name="password" placeholder="Пароль" {...register('password')}></input>
					{<span>{passwordError}</span>}
				</div>

				<div className={style.inputBox}>
					<input type="password" name="povtorPassword" {...register('povtorPassword')} placeholder="Повторите пароль"></input>
					{<span>{povtorPasswordError}</span>}
				</div>

				<button type="submit" className={style.btn} disabled={!!passwordError || !!emailError || !!povtorPasswordError}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
