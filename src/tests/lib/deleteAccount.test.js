import { AccountManager } from "../../lib/AccountManager";
import { FirebaseAccountManager } from "../../lib/FirebaseAccountManager";

jest.mock("../../lib/FirebaseAccountManager");

describe("AccountManager", () => {
    let accountManager;
    let mockDeleteAccount;

    beforeEach(() => {
        mockDeleteAccount = jest.fn();
        FirebaseAccountManager.mockImplementation(() => {
            return {
                deleteAccount: mockDeleteAccount,
            };
        });
        accountManager = new AccountManager();
    });

    test("Should call deleteAccount on FirebaseAccountManager with correct password", async () => {
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