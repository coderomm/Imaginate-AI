import CryptoJS from "crypto-js";

const secretKey: string = process.env.SECRET_KEY_FOR_API_HASHING || "default-key";

/**
 * Encrypt a URL
 * @param url - The original URL to encrypt
 * @returns Encrypted string
 */
export const encryptURL = (url: string): string => {
  return CryptoJS.AES.encrypt(url, secretKey).toString();
};

/**
 * Decrypt a URL
 * @param encryptedURL - The encrypted string to decrypt
 * @returns Decrypted string
 */
export const decryptURL = (encryptedURL: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedURL, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
