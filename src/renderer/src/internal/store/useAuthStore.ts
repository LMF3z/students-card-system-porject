import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserI } from '../interface';

interface AuthStoreI {
  isAuth: UserI | null;
  userToken: string | null;

  setAuth: (auth: { user: UserI; token: string }) => void;
  removeAuth: () => void;
}

export const useAuthStore = create<AuthStoreI>()(
  persist(
    (set) => ({
      isAuth: null,
      userToken: null,
      setAuth: ({ user, token }: { user: UserI; token: string }) => {
        set({ isAuth: user, userToken: token });
      },
      removeAuth: () => {
        set({ isAuth: null, userToken: null });
      },
    }),

    {
      name: 'session-user',
    }
  )
);
