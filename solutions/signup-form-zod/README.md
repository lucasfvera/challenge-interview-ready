# Sign Up Form Challenge

Build a user Signup form in React with the following features.

1. An email and a password input
2. Email must have an “@” and the domain side must include a “.”
3. Password must include
    - at least one special character
    - one number and be at least 8 characters
4. Submission request handling
    - Utilze the mock API function to handle submissions
5. Basic aesthetics with pure CSS

# Proposed Solution

This solution uses [Zod](https://zod.dev/) for validating the form and rendering the errors.
It also uses React 19 form capabilities and controlled inputs.