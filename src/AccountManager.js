import { FirebaseAccountManager } from "./FirebaseAccountManager";
import {SignUpValidator} from "./validateSignUpForm";
export const AccountManager = {

    async handleDeleteAccount(password, user, setError, setSuccess) {
        setError('');
        setSuccess(false);

        if (!user) {
            setError("User not logged in.");
            return;
        }

        try {
            await FirebaseAccountManager.deleteAccount(password);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        }
    },

    async handleSignUp(email, password, confirmedPassword, setError, setSuccess, setLoading, navigate) {
        setError('');
        setSuccess(false);
        setLoading(true);

        const validation = SignUpValidator.validate({ email, password, confirmedPassword });

        if (!validation.isValid) {
            const errorMessages = Object.values(validation.errors).join(' ');
            setError(errorMessages);
            setLoading(false);
            return;
        }

        try {
            await FirebaseAccountManager.signUp(email, password, email.split('@')[0]);
            setSuccess(true);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    },

    async handleSignIn(email, password, setError, setSuccess, setLoading, navigate) {
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            await FirebaseAccountManager.signIn(email, password);
            setSuccess(true);
            navigate('/');
        } catch (err) {
            setError('Incorrect email or password');
        } finally {
            setLoading(false);
        }
    },
    async handleSignOut() {
        return FirebaseAccountManager.signOut();
    },

};
