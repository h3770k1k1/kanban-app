import { AccountManager } from "../../lib/AccountManager";
import { FirebaseAccountManager } from "../../lib/FirebaseAccountManager";

jest.mock("../../lib/FirebaseAccountManager");

describe("AccountManager", () => {
    let accountManager;
    let mockSignOut;

    beforeEach(() => {
        mockSignOut = jest.fn();
        FirebaseAccountManager.mockImplementation(() => {
            return {
                signOut: mockSignOut,
            };
        });
        accountManager = new AccountManager();
    });

    test("Should call signOut on FirebaseAccountManager", async () => {
        mockSignOut.mockResolvedValue();

        await accountManager.signOut();

        expect(mockSignOut).toHaveBeenCalledTimes(1);
    });

    test("Should throw an error if signOut fails", async () => {
        const errorMessage = "Sign out failed";
        mockSignOut.mockRejectedValue(new Error(errorMessage));

        await expect(accountManager.signOut()).rejects.toThrow(errorMessage);
        expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
});