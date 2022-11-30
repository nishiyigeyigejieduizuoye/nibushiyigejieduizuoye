import { atom } from "recoil";
import { MemoInfo, UserInfo } from "../api/schema";

export const LoadingUserInfoState = atom<boolean>({
  key: "LoadingUserInfo",
  default: true,
});

export const UserInfoState = atom<UserInfo | null>({
  key: "CurrentUserInfo",
  default: null,
});

export const MemosState = atom<MemoInfo[]>({
  key: "Memos",
  default: [],
});
