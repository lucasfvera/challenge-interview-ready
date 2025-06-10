import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Main app component', () => {
	test('Renders the main form component', () => {
		render(<App />);

		const form = screen.getByRole('form');

		expect(form).toBeInTheDocument();
	});
});
