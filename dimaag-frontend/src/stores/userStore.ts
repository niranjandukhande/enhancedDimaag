import { userStore } from '@/types/userStore';
import { create } from 'zustand';

export const useUserStore = create<userStore>((set) => ({
  users: null,
  setUsers(users) {
    set({
      users,
    });
  },
}));
