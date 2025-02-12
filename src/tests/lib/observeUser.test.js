import { AccountManager } from "../../lib/AccountManager";
import { FirebaseAccountManager } from "../../lib/FirebaseAccountManager";

jest.mock("../../lib/FirebaseAccountManager");

describe("AccountManager", () => {
    let accountManager;
    let mockObserveUser;
    let unsubscribeMock;

    beforeEach(() => {
        mockObserveUser = jest.fn();
        unsubscribeMock = jest.fn();

        FirebaseAccountManager.mockImplementation(() => {
            return {
                observeUser: mockObserveUser,
            };
        });

        accountManager = new AccountManager();
    });

    test("Should call observeUser on FirebaseAccountManager with a callback", () => {
        const callback = jest.fn();
        mockObserveUser.mockImplementation((cb) => {
            cb({ uid: "12345", email: "test@example.com" });
            return unsubscribeMock;
        });

        const unsubscribe = accountManager.observeUser(callback);

        expect(mockObserveUser).toHaveBeenCalledWith(callback);
        expect(mockObserveUser).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith({ uid: "12345", email: "test@example.com" });

        expect(unsubscribe).toBe(unsubscribeMock);
    });

    test("Should correctly unsubscribe when observeUser returns an unsubscribe function", () => {
        const callback = jest.fn();
        mockObserveUser.mockReturnValue(unsubscribeMock);

        const unsubscribe = accountManager.observeUser(callback);
        unsubscribe();

        expect(unsubscribeMock).toHaveBeenCalledTimes(1);
    });
});