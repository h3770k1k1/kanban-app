import { AccountManager } from "../../lib/AccountManager";
import { FirebaseAccountManager } from "../../lib/FirebaseAccountManager";

jest.mock("../../lib/FirebaseAccountManager");

describe("AccountManager", () => {
    let accountManager;
    let mockSignIn;

    beforeEach(() => {
        mockSignIn = jest.fn();
        FirebaseAccountManager.mockImplementation(() => {
            return {
                signIn: mockSignIn,
            };
        });
        accountManager = new AccountManager();
    });

    test("Should call signIn on FirebaseAccountManager with correct parameters", async () => {
        const email = "test@example.com";
        const password = "testPassword123";
        const mockUser = { email, uid: "12345" };

        mockSignIn.mockResolvedValue(mockUser);

        const result = await accountManager.signIn(email, password);

        expect(mockSignIn).toHaveBeenCalledWith(email, password);
        expect(mockSignIn).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUser);
    });

    test("Should throw an error if signIn fails", async () => {
        const email = "test@example.com";
        const password = "wrongPassword";
        const errorMessage = "Incorrect email or password";

        mockSignIn.mockRejectedValue(new Error(errorMessage));

        await expect(accountManager.signIn(email, password)).rejects.toThrow(errorMessage);
        expect(mockSignIn).toHaveBeenCalledWith(email, password);
        expect(mockSignIn).toHaveBeenCalledTimes(1);
    });
});