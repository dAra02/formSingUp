import { useStore } from './sostoyniePoly';
import './forma.css';
import style from './Forma-SingUp.module.css';
import { useState, useRef } from 'react';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState, resetState } = useStore();
	const [errorLoginMesage, setErrorLoginMesage] = useState(null);
	const [errorPassword, setErrorPassword] = useState(null);
	const [errorPovtorPassword, setErrorPovtorPassword] = useState(null);
	const passwordRef = useRef(null);
	const buttonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const { email, password, povtorPassword } = getState();
	const onChange = ({ target }) => {
		updateState(target.name, target.value);
		let error = null;
		const { password } = getState();

		if (target.name === 'email') {
			if (!target.value) {
				error = 'Введите email';
			}
			setErrorLoginMesage(error);
		} else if (target.name === 'password') {
			if (!/^[\w!_-]*$/.test(target.value)) {
				error = 'Пароль принимает любые буквы, цифры и знаки: ! _  -';
			} else if (target.value.length > 20) {
				error = 'Длинна пароля не должна превышать 20 символов.';
			}
			setErrorPassword(error);
		} else if (target.name === 'povtorPassword') {
			passwordRef.current = target.value;
			if (password !== passwordRef.current) {
				error = 'Пароль не совпадает';
			}

			setErrorPovtorPassword(error);
		}
	};

	const onBlur = () => {
		if (password.length < 5) {
			setErrorPassword('Длинна пароля должна быть не меньше 5 символов.');
		}
	};

	return (
		<div className={style.App}>
			<form onSubmit={onSubmit} className={style.formContur}>
				<div className={style.singUp}>Sign Up</div>

				<div className={style.inputBox}>
					<input type="email" value={email} name="email" placeholder="Введите email" onChange={onChange} required></input>
					{errorLoginMesage && <span>{errorLoginMesage}</span>}
				</div>

				<div className={style.inputBox}>
					<input
						type="password"
						name="password"
						value={password}
						placeholder="Пароль"
						onBlur={onBlur}
						onChange={onChange}
						required
						ref={passwordRef}
					></input>
					{errorPassword && <span>{errorPassword}</span>}
				</div>

				<div className={style.inputBox}>
					<input
						type="password"
						name="povtorPassword"
						value={povtorPassword}
						placeholder="Повторите пароль"
						required
						onChange={onChange}
					></input>
					{errorPovtorPassword && <span>{errorPovtorPassword}</span>}
				</div>

				<button
					type="submit"
					className={style.btn}
					ref={buttonRef}
					disabled={errorLoginMesage !== null || errorPassword !== null || errorPovtorPassword !== null}
				>
					Зарегистрироваться
				</button>
				<button type="button" className={style.btn} onClick={resetState}>
					Очистить
				</button>
			</form>
		</div>
	);
};
