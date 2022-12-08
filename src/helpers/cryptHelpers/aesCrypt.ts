import Crypto from 'crypto-js';

const KEY = 'encrypt_key:aes';

const aesCrypt = {
  decrypt: (encValue: string) => Crypto.AES.decrypt(encValue, KEY).toString(Crypto.enc.Utf8),
  encrypt: (value: string) => Crypto.AES.encrypt(value, KEY).toString(),
};
export default aesCrypt;
