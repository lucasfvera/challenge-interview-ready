import { useState, type ChangeEvent, type FocusEvent } from 'react';
import { API } from './api';
import './App.css';
import { signUpFormSchema, type schema } from './signUpForm.schema';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		email: { value: '', hasErrorOnce: false },
		password: { value: '', hasErrorOnce: false },
	});
	const [errors, setErrors] = useState<{
		[fieldName: string]: string[];
	}>({});

	const submitForm = async (data: FormData) => {
		const jsonData = Object.fromEntries(data);
		const parsedData = signUpFormSchema.safeParse(jsonData);

		if (parsedData.success) {
			setIsLoading(true);
			API(data)
				.then((res) => {
					window.alert(res.success);
					setForm({
						email: { value: '', hasErrorOnce: false },
						password: { value: '', hasErrorOnce: false },
					});
					setErrors({});
				})
				.finally(() => setIsLoading(false));
		} else {
			setErrors(parsedData.error.flatten().fieldErrors);
		}
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target.name as keyof schema;
		const value = e.target.value;

		if (form[target].hasErrorOnce) {
			console.log('has error', target);
			const parsedValue = validator(target, value);
			setErrors((prev) => ({
				...prev,
				[target]: parsedValue.error
					? parsedValue.error.flatten().formErrors
					: [],
			}));
		}

		setForm((prev) => ({
			...prev,
			[target]: { value: value, hasErrorOnce: prev[target].hasErrorOnce },
		}));
	};

	const onBlurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
		const target = e.target.name as keyof schema;
		const value = e.target.value;
		if (value === '') return;
		const parsedValue = validator(target, value);
		if (!parsedValue.success) {
			setForm((prev) => ({
				...prev,
				[target]: { value: prev[target].value, hasErrorOnce: true },
			}));
		}
		setErrors((prev) => ({
			...prev,
			[target]: parsedValue.error
				? parsedValue.error.flatten().formErrors
				: [],
		}));
	};

	const validator = (target: keyof schema, value: string) => {
		const genericShape = signUpFormSchema.shape[target];
		return genericShape.safeParse(value);
	};

	return (
		<div className="main-container">
			<h1>Sign Up Form</h1>
			<form action={submitForm} className="basic-form" name="signup-form">
				<div className="basic-form__inputs-container">
					<label htmlFor="email">Email</label>
					<input
						disabled={isLoading}
						onChange={onChangeHandler}
						name="email"
						id="email"
						type="text"
						value={form.email.value}
						onBlur={onBlurHandler}
					/>
					{errors['email']?.map((e, i) => (
						<p className="error" key={i}>
							{e}
						</p>
					))}

					<label htmlFor="password">Password</label>
					<input
						onBlur={onBlurHandler}
						disabled={isLoading}
						onChange={onChangeHandler}
						name="password"
						id="password"
						type="password"
						value={form.password.value}
					/>
					{errors['password']?.map((e, i) => (
						<p className="error" key={i}>
							{e}
						</p>
					))}
				</div>
				<button disabled={isLoading} type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default App;

// 1. An email and a password input
// 2. Email must have an “@” and the domain side must include a “.”
// 3. Password must include
//     1.  at least one special character  [^a-zA-Z0-9]
//     2. one number and be at least 8 characters [0-9]
// 4. Submission request handling
//    1. Utilze the mock API function to handle submissions
// 5. Basic aesthetics with pure CSS
