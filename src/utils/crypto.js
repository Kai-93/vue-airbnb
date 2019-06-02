import CryptoJS from 'crypto-js';

const env = process.env;
const key = CryptoJS.enc.Utf8.parse(env.cryptoBody.key);
const keyHeader = CryptoJS.enc.Utf8.parse(env.cryptoHeader.key);
const iv = CryptoJS.enc.Utf8.parse(env.cryptoBody.iv);
const ivHeader = CryptoJS.enc.Utf8.parse(env.cryptoHeader.iv);

// 加密
export function encrypt(word, type) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encryptKey = type === 'header' ? keyHeader : key;
  const cryptoIv = type === 'header' ? ivHeader : iv;
  const encrypted = CryptoJS.AES.encrypt(srcs, encryptKey, {
    iv: cryptoIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

// 解密
export function decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const $decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = $decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
// md5加密
export function md5(word) {
  return CryptoJS.MD5(word).toString();
}

// base64加密
export function base64(word) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(word));
}
