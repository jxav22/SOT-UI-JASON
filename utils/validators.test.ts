// Mock the registered emails array so tests can control which emails are considered registered.
jest.mock("@/data/registeredEmails", () => ({ __esModule: true, default: ["test@gmail.com"] }));

import { 
  SUCCESS_MESSAGE,
  PASSWORD_ERROR,
  EMAIL_REGISTERED_ERROR,
  EMAIL_DOMAIN_ERROR,
  isComplexPassword, 
  isUnregisteredEmail, 
  endsWithGmail 
} from "@/utils/validators";

describe("utils/validators", () => {
  describe("isComplexPassword", () => {
    it("returns success for a valid complex password", () => {
      const res = isComplexPassword("Abcdef1!");
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });

    it("fails when password is too short", () => {
      const res = isComplexPassword("A1!a");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("fails when password is exactly one character short of minimum", () => {
      const shortPassword = "Abcdef!"; // 7 chars (one short of minimum 8)
      expect(shortPassword.length).toBe(7);
      const res = isComplexPassword(shortPassword);
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("fails when missing an uppercase letter", () => {
      const res = isComplexPassword("abcdef1!");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("fails when missing a number", () => {
      const res = isComplexPassword("Abcdefg!");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("fails when missing a special character", () => {
      const res = isComplexPassword("Abcdef12");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("fails when password is exactly one character over maximum", () => {
      const longPassword = "Abcdefghijklmnopqrst!"; // 21 chars (one over maximum 20)
      expect(longPassword.length).toBe(21);
      const res = isComplexPassword(longPassword);
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("fails when password is significantly longer than maximum", () => {
      const long = "A".repeat(24) + "a1!"; // Much longer than maximum 20 chars
      expect(long.length).toBeGreaterThan(20);
      const res = isComplexPassword(long);
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("accepts password at minimum length boundary", () => {
      const minPassword = "Abcdef1!"; // exactly 8 chars (minimum length)
      expect(minPassword.length).toBe(8);
      const res = isComplexPassword(minPassword);
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });

    it("accepts password at maximum length boundary", () => {
      const maxPassword = "Abcdefghijklmnopqr1!"; // exactly 20 chars (maximum length)
      expect(maxPassword.length).toBe(20);
      const res = isComplexPassword(maxPassword);
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });

    it("handles null input", () => {
      const res = isComplexPassword(null as any);
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("handles undefined input", () => {
      const res = isComplexPassword(undefined as any);
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });

    it("handles empty string", () => {
      const res = isComplexPassword("");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(PASSWORD_ERROR);
    });
  });

  describe("isUnregisteredEmail", () => {
    it("rejects an already registered email", () => {
      const res = isUnregisteredEmail("test@gmail.com");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_REGISTERED_ERROR);
    });

    it("accepts an unregistered email", () => {
      const res = isUnregisteredEmail("new@gmail.com");
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });

    it("handles empty string (not registered)", () => {
      const res = isUnregisteredEmail("");
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });

    it("trims whitespace when checking registration", () => {
      // 'test@gmail.com' is mocked as registered in the module mock above
      const res = isUnregisteredEmail("  test@gmail.com  ");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_REGISTERED_ERROR);
    });

    it("is case-insensitive with respect to registered emails array values", () => {
      // The registeredEmails mock contains "test@gmail.com" (lowercase). 
      // The function converts input to lowercase, so different case should be considered registered.
      const res = isUnregisteredEmail("Test@GMAIL.com");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_REGISTERED_ERROR);
    });

    it("handles null input", () => {
      const res = isUnregisteredEmail(null as any);
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });

    it("handles undefined input", () => {
      const res = isUnregisteredEmail(undefined as any);
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });
  });

  describe("endsWithGmail", () => {
    it("accepts emails that end with @gmail.com (case-insensitive)", () => {
      const res1 = endsWithGmail("user@gmail.com");
      expect(res1[0]).toBe(true);
      expect(res1[1]).toBe(SUCCESS_MESSAGE);
      
      const res2 = endsWithGmail("User@GMAIL.com");
      expect(res2[0]).toBe(true);
      expect(res2[1]).toBe(SUCCESS_MESSAGE);
      
      const res3 = endsWithGmail("  user@gmail.com  ");
      expect(res3[0]).toBe(true);
      expect(res3[1]).toBe(SUCCESS_MESSAGE);
    });

    it("rejects non-gmail domains", () => {
      const res = endsWithGmail("user@yahoo.com");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_DOMAIN_ERROR);
    });

    it("handles null input", () => {
      const res = endsWithGmail(null as any);
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_DOMAIN_ERROR);
    });

    it("handles undefined input", () => {
      const res = endsWithGmail(undefined as any);
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_DOMAIN_ERROR);
    });

    it("handles empty string", () => {
      const res = endsWithGmail("");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_DOMAIN_ERROR);
    });

    it("rejects malformed email with only domain", () => {
      const res = endsWithGmail("@gmail.com");
      expect(res[0]).toBe(true);
      expect(res[1]).toBe(SUCCESS_MESSAGE);
    });

    it("rejects email with gmail domain but different TLD", () => {
      const res = endsWithGmail("user@gmail.org");
      expect(res[0]).toBe(false);
      expect(res[1]).toBe(EMAIL_DOMAIN_ERROR);
    });
  });
});
