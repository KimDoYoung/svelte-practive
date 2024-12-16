
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
