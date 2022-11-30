export interface UserInfo {
  id: number;
  username: string;
}

export interface MemoInfo {
  id: number;
  title: string;
  lastModified: string;
}

export interface MemoDetail extends MemoInfo {
  content: string;
}
