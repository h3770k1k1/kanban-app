import { AccountManager } from '../AccountManager';

describe('AccountManager', () => {
it('should set error if user is not logged in', async () => {
    const setError = jest.fn();
    const setSuccess = jest.fn();
    const user = null;

    await AccountManager.handleDeleteAccount('password', user, setError, setSuccess);

    expect(setError).toHaveBeenCalledWith("User not logged in.");
    expect(setSuccess).toHaveBeenCalledWith(false);
});
});
