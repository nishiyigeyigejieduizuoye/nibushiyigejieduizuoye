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

export interface Nuclein {
  Nno: string;
  Nmname: string;
  Snum: number;
  Nqdate: string;
  Nmdate: string;
  Nmaddr: string;
  Nneq: boolean;
}
