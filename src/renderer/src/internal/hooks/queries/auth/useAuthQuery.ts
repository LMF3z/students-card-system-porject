import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { KEY_GET_ADMIN_USER, REGISTER_ADMIN_USER } from '../queries.constants';
import {
  getIfExistAdminApi,
  loginUserApi,
  registerNewAdminApi,
} from '../../../../api';
import type { CreateAminUserI, LoginI } from '../../../interface';

export const useGetIfExistAdminQuery = () =>
  useQuery({
    queryKey: [KEY_GET_ADMIN_USER],
    queryFn: () => getIfExistAdminApi(),
  });

export const useRegisterNewAdminMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: [REGISTER_ADMIN_USER],
    mutationFn: (newUserAdmin: CreateAminUserI) =>
      registerNewAdminApi(newUserAdmin),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_ADMIN_USER] });
    },
  });
};

export const useLoginUserMutation = () =>
  useMutation({
    mutationKey: [REGISTER_ADMIN_USER],
    mutationFn: (auth: LoginI) => loginUserApi(auth),
  });
