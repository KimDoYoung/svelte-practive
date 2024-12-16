export interface SnoteBase {
  id: number; // Primary key, auto-increment
  title?: string; // Optional field
  create_dt: string; // Timestamp, default to current timestamp
  hint?: string; // Optional field
  note?: string; // Optional field
}

export interface SnoteCreate {
  title?: string;
  hint?: string;
  note?: string;
  password?: string;
}

export interface SnoteHintPassword {
  hint: string;
  password: string;
}

export interface SnoteList {
  snote_list: SnoteBase[];
  last_index : number;
  next_exist : boolean;
  limit : number;
}

export interface SnoteTitleNote {
  id: number;
  title: string;
  note: string;
}

//실제 저장된 데이터의 구조를 분해해서 보여주는 인터페이스
export interface SnoteParse {
  hint: string;
  hashPassword: string;
  encryptedText: string;
}

export interface SnoteResponse {
  id: number;
  title: string;
  note: string;
  create_dt: string;
}