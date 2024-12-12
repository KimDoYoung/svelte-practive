export interface MovieReviewListResponse {
  list: MovieReviewItem[];
  item_count: number;
  next_data_exists: boolean;
  next_index: number;
}

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
