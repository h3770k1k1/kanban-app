import { SignUpValidator } from '../../helpers/validateSignUpForm';

describe('SignUpValidator', () => {
    it('Should return true for correct email, password, and matching passwords', () => {
        const email = "test@example.com";
        const password = "password123";
        const confirmedPassword = "password123";
        const params = {
            email: email,
            password: password,
            confirmedPassword: confirmedPassword,
        };

        const response = SignUpValidator.validate(params);

        expect(response.isValid).toBe(true);
        expect(response.errors.email).toBe('');
        expect(response.errors.password).toBe('');
        expect(response.errors.confirmedPassword).toBe('');
    });

    it('Should invalidate for incorrect email', () => {
        const invalidEmail = "email_without_at";
        const password = "password123";
        const confirmedPassword = "password123";
        const params = {
            email: invalidEmail,
            password: password,
            confirmedPassword: confirmedPassword,
        };

        try {
            SignUpValidator.validate(params);
        } catch (error) {
            expect(error).toBeInstanceOf(SignUpValidator.ValidationError);
            expect(error.message).toBe('Email is invalid.');
        }
    });

    it('Should invalidate for short password', () => {
        const email = "test@example.com";
        const password = "123";  // Short password
        const confirmedPassword = "123";
        const params = {
            email: email,
            password: password,
            confirmedPassword: confirmedPassword,
        };

        try {
            SignUpValidator.validate(params);
        } catch (error) {
            expect(error).toBeInstanceOf(SignUpValidator.ValidationError);
            expect(error.message).toBe('Password must be at least 6 characters long.');
        }
    });

    it('Should invalidate for non-matching passwords', () => {
        const email = "test@example.com";
        const password = "password123";
        const confirmedPassword = "password321";
        const params = {
            email: email,
            password: password,
            confirmedPassword: confirmedPassword,
        };

        try {
            SignUpValidator.validate(params);
        } catch (error) {
            expect(error).toBeInstanceOf(SignUpValidator.ValidationError);
            expect(error.message).toBe('Passwords do not match.');
        }
    });

    it('Should invalidate for all invalid inputs', () => {
        const email = "invalid";
        const password = "123";
        const confirmedPassword = "321";
        const params = {
            email: email,
            password: password,
            confirmedPassword: confirmedPassword,
        };

        try {
            SignUpValidator.validate(params);
        } catch (error) {
            expect(error).toBeInstanceOf(SignUpValidator.ValidationError);
            expect(error.message).toContain('Email is invalid.');
            expect(error.message).toContain('Password must be at least 6 characters long.');
            expect(error.message).toContain('Passwords do not match.');
        }
    });
});
