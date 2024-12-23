
export interface MovieReviewItem {
  title: string;
  nara: string;
  year: string;
  lvl: number;
  ymd: string;
  content: string;
  lastmodify_dt: string; // ISO 8601 datetime string
  id: number;
}
export interface MovieReviewListRequest {
  search_text?: string;
  nara?: string;
  year?: string;
  lvl?: string;
  start_ymd?: string;
  end_ymd?: string;
  start_index: number;
  limit: number;
  include_content: boolean;
}
export interface MovieReviewListResponse {
  list: MovieReviewItem[];
  item_count: number;
  next_data_exists: boolean;
  start_index: number;
  next_index: number;
}

// DVD 영화DVD모은것
export interface MovieDvdItem  {
  mid: string; // 예: "M0141"
  gubun: string; // 예: "M"
  title1: string; // 예: "사랑의 행로"
  title2: string | null; // 예: "The Fabulous Baker Boys" 또는 null
  title3: string | null; // null 가능
  category: string; // 예: "드라마/멜로"
  gamdok: string; // 예: "스티브 클로비스"
  make_year: string; // 예: "1989"
  nara: string; // 예: "미국"
  dvd_id: string; // 예: "M0048"
  title1num: string | null; // null 가능
  title1title2: string; // 예: "사랑의 행로 The Fabulous Baker Boys"
  id: number; // 예: 1821
};

export interface MovieDvdListResponse  {
  list: MovieDvdItem[];
  "item_count": number,
  "next_data_exists": boolean,
  "start_index": number,
  "next_index": number
};

//---------------------------------------------
// HDD
//---------------------------------------------

export interface HddRequest {
  search_text?: string;
  start_index: number;
  limit: number;
  volumn_name : string;
  gubun : string;
}



export interface HddResponseItem {
  id: number; // 파일의 고유 ID
  volumn_name: string; // 볼륨 이름 (예: "2T-1")
  gubun: string; // 파일의 구분 또는 유형 (예: "F")
  path: string; // 파일의 전체 경로
  file_name: string; // 파일 이름 (경로 제외)
  name: string; // 파일 이름 (확장자 포함)
  pdir: string; // 상위 디렉토리 경로
  extension: string; // 파일 확장자 (예: "mkv")
  size: number; // 파일 크기 (바이트 단위)
  sha1_cd: string; // 파일의 SHA-1 체크섬
  srch_key: string; // 파일과 관련된 검색 키
  last_modified_ymd: string; // 마지막 수정 날짜 (형식: "YYYYMMDDHHMMSS")
  pid: number; // 부모 ID
  right_pid: number | null; // 관련된 부모 ID (nullable)
}

export interface HddResponse {
  list: HddResponseItem[];
  data_count: number;
  next_data_exists: boolean;
  start_index: number;
  last_index: number;
  limit: number;
}