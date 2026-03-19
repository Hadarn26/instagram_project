import { atom } from "jotai";
import { TUser } from "../services/user/types/TypeUser";

export interface IUserStore {
  isAuthenticated: boolean;
  id: TUser['id'] | null;
  username?: TUser['username'];
  profileImg?: TUser['profileImg'];
}

export const userDefaultValue: IUserStore = {
  isAuthenticated: false,
  id: null,
  username: undefined,
  profileImg: undefined,
};

export const userAtom = atom<IUserStore>(userDefaultValue);