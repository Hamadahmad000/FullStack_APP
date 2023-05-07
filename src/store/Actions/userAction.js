import {SIGN_UP} from '../Types';

export const createUser = data => ({
  type: SIGN_UP,
  payload: data,
});
