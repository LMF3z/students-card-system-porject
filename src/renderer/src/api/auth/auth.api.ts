import type {
  CreateAminUserI,
  LoginI,
} from '../../internal/interface/user/user.interface';

export const getIfExistAdminApi = () => {
  try {
    return window.api.GET_ADMIN_USER();
  } catch (error) {
    console.log('Error GET_ADMIN_USER', error);
    throw error;
  }
};

export const registerNewAdminApi = (newUser: CreateAminUserI) => {
  return window.api.REGISTER_ADMIN_USER(newUser);
};

export const loginUserApi = (auth: LoginI) => {
  return window.api.LOGIN_USER(auth);
};
