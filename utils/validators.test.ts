// Mock the registered emails array so tests can control which emails are considered registered.
jest.mock("@/data/registeredEmails", () => ({ __esModule: true, default: ["test@gmail.com"] }));

import { isComplexPassword, isUnregisteredEmail, endsWithGmail } from "@/utils/validators";

describe("utils/validators", () => {
  describe("isComplexPassword", () => {
    it("returns success for a valid complex password", () => {
      expect(isComplexPassword("Abcdef1!")).toEqual([true, "success"]);
    });

    it("fails when password is too short", () => {
      const res = isComplexPassword("A1!a");
      expect(res[0]).toBe(false);
      expect(res[1]).toMatch(/Password must be between/);
    });

    it("fails when missing an uppercase letter", () => {
      const res = isComplexPassword("abcdef1!");
      expect(res[0]).toBe(false);
    });

    it("fails when missing a number", () => {
      const res = isComplexPassword("Abcdefg!");
      expect(res[0]).toBe(false);
    });

    it("fails when missing a special character", () => {
      const res = isComplexPassword("Abcdef12");
      expect(res[0]).toBe(false);
    });

    it("fails when too long", () => {
      const long = "A".repeat(21) + "a1!"; // longer than PASSWORD_MAX_LENGTH
      const res = isComplexPassword(long);
      expect(res[0]).toBe(false);
    });
  });

  describe("isUnregisteredEmail", () => {
    it("rejects an already registered email", () => {
      expect(isUnregisteredEmail("test@gmail.com")).toEqual([false, "Email is already registered"]);
    });

    it("accepts an unregistered email", () => {
      expect(isUnregisteredEmail("new@gmail.com")).toEqual([true, "success"]);
    });

    it("handles empty string (not registered)", () => {
      expect(isUnregisteredEmail("")).toEqual([true, "success"]);
    });

    it("trims whitespace when checking registration", () => {
      // 'test@gmail.com' is mocked as registered in the module mock above
      expect(isUnregisteredEmail("  test@gmail.com  ")).toEqual([false, "Email is already registered"]);
    });

    it("is case-sensitive with respect to registered emails array values", () => {
      // The registeredEmails mock contains "test@gmail.com" (lowercase). Passing different case should be considered unregistered by current implementation.
      expect(isUnregisteredEmail("Test@GMAIL.com")).toEqual([true, "success"]);
    });
  });

  describe("endsWithGmail", () => {
    it("accepts emails that end with @gmail.com (case-insensitive)", () => {
      expect(endsWithGmail("user@gmail.com")).toEqual([true, "success"]);
      expect(endsWithGmail("User@GMAIL.com")).toEqual([true, "success"]);
      expect(endsWithGmail("  user@gmail.com  ")).toEqual([true, "success"]);
    });

    it("rejects non-gmail domains", () => {
      expect(endsWithGmail("user@yahoo.com")).toEqual([false, "Email must end with @gmail.com"]);
    });
  });
});
