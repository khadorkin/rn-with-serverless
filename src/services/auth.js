import axios from 'axios';

import { OAUTH_CONFIG } from '../utils/constants';

const instance = axios.create({
  baseURL: OAUTH_CONFIG.issuer,
  timeout: 3000
});

export async function logout(ID) {
  return instance.get(`/v1/logout?id_token_hint=${encodeURIComponent(ID)}`);
};

export async function getUserInfo(access) {
  return instance.get(`/v1/userinfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ('Bearer ' + access)
    }
  });
};