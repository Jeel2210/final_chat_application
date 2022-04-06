import CryptoJS from "crypto-js";

// Encrypt
export const setData = (value, data) => {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secret key 123"
  ).toString();
  localStorage.setItem(value, ciphertext);
  return ciphertext;
};

// Decrypt
export const getData = (data) => {
  let vara = localStorage.getItem(data);
  if (vara) {
    var bytes = CryptoJS.AES.decrypt(vara, "secret key 123");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } else {
    return null;
  }
};
