import axios from "axios";
import { MemoDetail, MemoInfo, UserInfo } from "./schema";

const instance = axios.create({
  timeout: 10000,
});

export async function getUserInfo(): Promise<UserInfo> {
  return (await instance.get<UserInfo>("/api/user/info")).data;
}

export async function login(username: string, password: string) {
  return await instance.post("/api/user/login", {
    username,
    password,
  });
}

export async function register(username: string, password: string) {
  return await instance.post("/api/user/register", {
    username,
    password,
  });
}

export async function logout() {
  return await instance.post("/api/user/logout");
}

export async function listMemos(): Promise<MemoInfo[]> {
  return (await instance.get<MemoInfo[]>("/api/memo/")).data;
}

export async function getMemo(id: number): Promise<MemoDetail> {
  return (await instance.get<MemoDetail>("/api/memo/" + id.toString())).data;
}

export async function createMemo(title: string, content: string) {
  return await instance.post("/api/memo/", { title, content });
}

export async function patchMemo(memo: MemoDetail) {
  return await instance.patch("/api/memo/" + memo.id.toString(), {
    title: memo.title,
    content: memo.content,
  });
}

export async function deleteMemo(id: number) {
  return await instance.delete("/api/memo/" + id.toString());
}
