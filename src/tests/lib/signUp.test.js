import { AccountManager } from "../../lib/AccountManager";
import { FirebaseAccountManager } from "../../lib/FirebaseAccountManager";

jest.mock("../../lib/FirebaseAccountManager");

describe("AccountManager", () => {
    let accountManager;
    let mockSignUp;

    beforeEach(() => {
        mockSignUp = jest.fn();
        FirebaseAccountManager.mockImplementation(() => {
            return {
                signUp: mockSignUp,
            };
        });
        accountManager = new AccountManager();
    });

    test("Should call signUp on FirebaseAccountManager with correct parameters", async () => {
        const email = "test@example.com";
        const password = "testPassword123";
        const displayName = "Test User";
        const mockUser = { email, displayName };

        mockSignUp.mockResolvedValue(mockUser);

        const result = await accountManager.signUp(email, password, displayName);

        expect(mockSignUp).toHaveBeenCalledWith(email, password, displayName);
        expect(mockSignUp).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUser);
    });

    test("Should throw an error if signUp fails", async () => {
        const email = "test@example.com";
        const password = "weak";
        const displayName = "Test User";
        const errorMessage = "Signup failed";

        mockSignUp.mockRejectedValue(new Error(errorMessage));

        await expect(accountManager.signUp(email, password, displayName)).rejects.toThrow(errorMessage);
        expect(mockSignUp).toHaveBeenCalledWith(email, password, displayName);
        expect(mockSignUp).toHaveBeenCalledTimes(1);
    });
});