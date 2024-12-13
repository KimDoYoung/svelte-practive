
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
  next_index: number;
}
