import React from 'react';

/*
  Build a user Signup form in React with the following features.

  1. An email and a password input
  2. Email must have an “@” and the domain side must include a “.”
  3. Password must include
      1.  at least one special character
      2. one number and be at least 8 characters
  4. Submission request handling  
      1. Utilze the mock API function to handle submissions
  5. Basic aesthetics with pure CSS
*/

/*
  Steps
  1. Form structure: form, inputs, labels and button
  2. Handlers for change and submit
  3. Connect the form to the API
  4. Validation methods and connect them to submit event

  Nice to have
  1. Show the form errors for each input
  2. Show loading states and disable the inputs and button while loading
  3. Show/hide password feature
  4. Validate the inputs on change and on blur
  5. Randomize the API response error to handle it in the form
  6. Show a success or error message depending on the response

*/

function API(data) {
	console.log('Submitted data: ', data);
	return new Promise((res) => {
		setTimeout(
			() =>
				res({
					success: 'Your Account has been successfully created!',
					error: 'Username is taken',
				}),
			1000
		);
	});
}

const DEFAULT_FORM_VALUES = {
	email: { value: '', errors: [], hasErrorOnce: false },
	password: { value: '', errors: [], hasErrorOnce: false },
	formStatus: '',
};

export function App() {
	const [form, setForm] = React.useState(DEFAULT_FORM_VALUES);
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
	const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);

	const submit = (e) => {
		e.preventDefault();
		resetErrors();

		const isEmailValid = emailValidator(form.email.value);
		const isPasswordValid = passwordValidator(form.password.value);

		if (!isEmailValid || !isPasswordValid) {
			console.error('Invalid values');
			return;
		}

		setIsFormSubmitting(true);
		API(form)
			.then((res) => {
				resetForm();
				setForm((prev) => ({ ...prev, formStatus: res.success }));
			})
			.finally(() => setIsFormSubmitting(false));
	};

	const changeHandler = (e) => {
		const target = e.target.name;
		const value = e.target.value;

		if (form[target].hasErrorOnce) {
			validators[target](value);
		}

		setForm((prev) => ({
			...prev,
			[target]: { ...prev[target], value },
		}));
	};

	const resetForm = () => setForm(DEFAULT_FORM_VALUES);

	const addError = (target, errorMsg) =>
		setForm((prev) => ({
			...prev,
			[target]: {
				...prev[target],
				errors: [...prev[target].errors, errorMsg],
				hasErrorOnce: true,
			},
		}));

	const resetErrors = () =>
		setForm((prev) => ({
			...prev,
			email: { ...prev.email, errors: [], hasErrorOnce: false },
			password: {
				...prev.password,
				errors: [],
				hasErrorOnce: false,
			},
		}));

	/**
	 *
	 * @param {string} email
	 * @returns boolean indicating if the email is valid
	 */
	const emailValidator = (email) => {
		setForm((prev) => ({
			...prev,
			email: { ...prev.email, errors: [] },
		}));
		const domain = email.split('@')[1];
		const hasDomain = !!domain;
		const hasTopLevelDomain =
			domain?.split('.').filter((el) => el !== '').length >= 2;

		if (!hasDomain) {
			addError('email', 'Must have a valid domain after the @');
		}

		if (!hasTopLevelDomain) {
			addError('email', 'Must have a valid domain with "." in it');
		}

		return hasDomain && hasTopLevelDomain;
	};

	/**
	 *
	 * @param {string} password
	 * @returns boolean indicating if the password is valid
	 */
	const passwordValidator = (password) => {
		setForm((prev) => ({
			...prev,
			password: { ...prev.password, errors: [] },
		}));
		const specialCharRegex = new RegExp(/[^a-zA-Z0-9]/);
		const numberCharRegex = new RegExp(/[0-9]/);

		const hasProperLength = password.length >= 8;
		const hasSpecialChar = specialCharRegex.test(password);
		const hasNumberChar = numberCharRegex.test(password);

		if (!hasProperLength) {
			addError('password', 'Must have at least 8 characters');
		}
		if (!hasSpecialChar) {
			addError('password', 'Must have at least one special character');
		}
		if (!hasNumberChar) {
			addError('password', 'Must have at least one number');
		}

		return hasProperLength && hasSpecialChar && hasNumberChar;
	};

	const validators = {
		email: emailValidator,
		password: passwordValidator,
	};

	return (
		<>
			<h1>Signup Form</h1>
			<form name="signup-form" onSubmit={submit} className="form">
				<div>
					<label>
						Email
						<input
							type="text"
							name="email"
							value={form.email.value}
							onChange={changeHandler}
							disabled={isFormSubmitting}
						/>
					</label>
					{form.email.errors.map((error, i) => (
						<p key={i} className="error">
							{error}
						</p>
					))}
				</div>
				<div>
					<div className="flex-container">
						<label>
							Password
							<input
								type={isPasswordVisible ? 'text' : 'password'}
								name="password"
								value={form.password.value}
								onChange={changeHandler}
								disabled={isFormSubmitting}
							/>
						</label>
						<button
							type="button"
							onClick={() =>
								setIsPasswordVisible((prev) => !prev)
							}
							disabled={isFormSubmitting}
						>
							{isPasswordVisible ? 'hide' : 'show'}
						</button>
					</div>
					{form.password.errors.map((error, i) => (
						<p key={i} className="error">
							{error}
						</p>
					))}
				</div>
				<button type="submit" disabled={isFormSubmitting}>
					Submit
				</button>
			</form>
			<p className="success">{form.formStatus}</p>
		</>
	);
}
