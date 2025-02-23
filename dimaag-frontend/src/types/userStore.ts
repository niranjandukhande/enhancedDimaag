import { userType } from './userType';

export interface userStore {
  users: userType[] | null;

  setUsers: (users: userType[]) => void;
}
