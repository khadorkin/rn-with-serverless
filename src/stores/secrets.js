import 'whatwg-fetch';
global.fetch = fetch;
import Realm from 'realm';
import sha256 from 'crypto-js/sha256';
import pbkdf2 from 'crypto-js/pbkdf2';
import hex from 'crypto-js/enc-hex';
import base64 from 'base-64';
import base64js from 'base64-js';
import DeviceInfo from 'react-native-device-info';
import decoder from 'jwt-decode';

const UserSecretSchema = {
  name: 'UserSecret',
  primaryKey: 'ID',
  properties: {
    confirmed: 'bool',
    ID: 'string',
    access: 'string',
    name: 'string',
    email: 'string'
  }
};

const REALM_PATH = `realm.secrets`;

const getEncryptionKey = async jwtSub => {
  const idHex = hex.stringify(sha256(DeviceInfo.getDeviceId()));
  const pwdHex = hex.stringify(sha256(jwtSub));

  const key = pbkdf2(pwdHex, idHex, { keySize: 512 / 64 });
  const keyEnc64 = base64.encode(key.toString());
  return base64js.toByteArray(keyEnc64);
};

export const deleteStore = async ID => {
  const jwt = new decoder(ID);
  const keyBytes = await getEncryptionKey(jwt.sub);

  return Realm.deleteFile({
    path: REALM_PATH,
    schema: [UserSecretSchema],
    encryptionKey: keyBytes,
    schemaVersion: 1
  });
};

export const getStore = async ID => {
  const jwt = new decoder(ID);
  const keyBytes = await getEncryptionKey(jwt.sub);

  return Realm.open({
    path: REALM_PATH,
    schema: [UserSecretSchema],
    encryptionKey: keyBytes,
    schemaVersion: 1
  });
};

export const getSecrets = async ID => {
  const secretsStore = await getStore(ID);
  const secrets = secretsStore
    .objects('UserSecret')
    .map(item => Object.assign({}, item));
  return secrets;
};

export const storeSecrets = async (ID, secret) => {
  const store = await getStore(ID);
  try {
    await store.write(() => { store.create(UserSecretSchema.name, secret, true) });
  } catch (err) {
    throw 'Couldn\'t store secrets: ' + err
  }
};
