import { AccountManager } from "../../lib/AccountManager";
import { FirebaseAccountManager } from "../../lib/FirebaseAccountManager";

jest.mock("../../lib/FirebaseAccountManager");

describe("AccountManager", () => {
    let accountManager;
    let mockSignIn, mockSignUp, mockSignOut, mockObserveUser, unsubscribeMock, mockDeleteAccount;

    beforeEach(() => {
        mockSignIn = jest.fn();
        mockSignUp = jest.fn();
        mockSignOut = jest.fn();
        mockObserveUser = jest.fn();
        mockDeleteAccount = jest.fn();
        unsubscribeMock = jest.fn();

        FirebaseAccountManager.mockImplementation(() => ({
            signIn: mockSignIn,
            signUp: mockSignUp,
            signOut: mockSignOut,
            observeUser: mockObserveUser,
            deleteAccount: mockDeleteAccount,
        }));

        accountManager = new AccountManager();
    });

    describe("signIn", () => {
        test("Should call signIn with correct parameters", async () => {
            const email = "test@example.com", password = "testPassword123";
            const mockUser = { email, uid: "12345" };
            mockSignIn.mockResolvedValue(mockUser);

            const result = await accountManager.signIn(email, password);

            expect(mockSignIn).toHaveBeenCalledWith(email, password);
            expect(result).toEqual(mockUser);
        });

        test("Should throw error if signIn fails", async () => {
            const errorMessage = "Incorrect email or password";
            mockSignIn.mockRejectedValue(new Error(errorMessage));

            await expect(accountManager.signIn("test@example.com", "wrongPassword")).rejects.toThrow(errorMessage);
        });
    });

    describe("signUp", () => {
        test("Should call signUp with correct parameters", async () => {
            const email = "test@example.com", password = "testPassword123", displayName = "Test User";
            const mockUser = { email, displayName };
            mockSignUp.mockResolvedValue(mockUser);

            const result = await accountManager.signUp(email, password, displayName);

            expect(mockSignUp).toHaveBeenCalledWith(email, password, displayName);
            expect(result).toEqual(mockUser);
        });

        test("Should throw error if signUp fails", async () => {
            const errorMessage = "Signup failed";
            mockSignUp.mockRejectedValue(new Error(errorMessage));

            await expect(accountManager.signUp("test@example.com", "weak", "Test User")).rejects.toThrow(errorMessage);
        });
    });

    describe("signOut", () => {
        test("Should call signOut", async () => {
            mockSignOut.mockResolvedValue();
            await accountManager.signOut();
            expect(mockSignOut).toHaveBeenCalledTimes(1);
        });

        test("Should throw error if signOut fails", async () => {
            const errorMessage = "Sign out failed";
            mockSignOut.mockRejectedValue(new Error(errorMessage));

            await expect(accountManager.signOut()).rejects.toThrow(errorMessage);
        });
    });

    describe("observeUser", () => {
        test("Should call observeUser with a callback", () => {
            const callback = jest.fn();
            mockObserveUser.mockImplementation((cb) => {
                cb({ uid: "12345", email: "test@example.com" });
                return unsubscribeMock;
            });

            const unsubscribe = accountManager.observeUser(callback);

            expect(mockObserveUser).toHaveBeenCalledWith(callback);
            expect(callback).toHaveBeenCalledWith({ uid: "12345", email: "test@example.com" });
            expect(unsubscribe).toBe(unsubscribeMock);
        });

        test("Should unsubscribe when observeUser returns unsubscribe function", () => {
            const callback = jest.fn();
            mockObserveUser.mockReturnValue(unsubscribeMock);

            const unsubscribe = accountManager.observeUser(callback);
            unsubscribe();

            expect(unsubscribeMock).toHaveBeenCalledTimes(1);
        });
    });

    describe("deleteAccount", () => {
        test("Should call deleteAccount with correct password", async () => {
            const password = "testPassword123";
            mockDeleteAccount.mockResolvedValue("Account deleted successfully");

            const result = await accountManager.deleteAccount(password);

            expect(mockDeleteAccount).toHaveBeenCalledWith(password);
            expect(mockDeleteAccount).toHaveBeenCalledTimes(1);
            expect(result).toBe("Account deleted successfully");
        });

        test("Should throw an error if deleteAccount fails", async () => {
            const password = "wrongPassword";
            const errorMessage = "Deleting failed";
            mockDeleteAccount.mockRejectedValue(new Error(errorMessage));

            await expect(accountManager.deleteAccount(password)).rejects.toThrow(errorMessage);
            expect(mockDeleteAccount).toHaveBeenCalledWith(password);
            expect(mockDeleteAccount).toHaveBeenCalledTimes(1);
        });
    });
});
