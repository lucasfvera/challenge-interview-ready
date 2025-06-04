function API(
	data: unknown
): Promise<{ ok: boolean; success: string; error: string }> {
	const responseOk = Math.random() > 0.3;
	return new Promise((res) => {
		setTimeout(
			() =>
				res({
					ok: responseOk,
					success: 'Your Account has been successfully created!',
					error: 'Username is taken',
				}),
			1000
		);
	});
}

const submitUser = async (formData: FormData) => {
	const username = formData.get('user-email');
	const password = formData.get('password');
	try {
		const res = await API({ username, password });
		if (res.ok) {
			window.alert(res.success);
		} else {
			throw new Error(res.error);
		}
	} catch (err) {
		console.error(err);
	}
};

function App() {
	return (
		<>
			<h1>Sign Up Form with Vite</h1>
			<form action={submitUser} name="sign-up-form">
				<label>
					Email
					<input type="email" required name="user-email" />
				</label>
				<label>
					Password
					<input type="password" required name="password" />
				</label>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default App;
