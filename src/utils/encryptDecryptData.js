import { AES, enc } from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

if (!SECRET_KEY) {
  console.error("SECRET_KEY is missing. Check your .env and restart the dev server.");
}

// Function to encrypt data
export const encryptData = (value) => {
  const encryptedValue = AES.encrypt(value, SECRET_KEY).toString();
  return encryptedValue;
};

// Function to decrypt data
export const decryptData = (encryptedValue) => {
  try {
    if (!encryptedValue) {
      return "";
    }
    const bytes = AES.decrypt(encryptedValue, SECRET_KEY);

    if (!bytes) {
      return "";
    }
    const decryptedData = bytes.toString(enc.Utf8);
    return decryptedData || null;
  } catch (error) {
    console.error(`Error decrypting data`, error);
    return null;
  }
};
