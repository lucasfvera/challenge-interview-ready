function API(data: FormData): Promise<{ success: string; error: string }> {
	console.log(data);
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

export { API };
