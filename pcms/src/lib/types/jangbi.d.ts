// 구매물품 테이블 인터페이스
export interface JangbiResponse {
  /** id */
  id: number; 

  /** 구입일 */
  ymd: string;

  /** 품목 */
  item: string;

  /** 위치 */
  location?: string | null;

  /** 가격 */
  cost?: number | null;

  /** 스펙(특징) */
  spec?: string | null;

  /** 레벨 (Default: '2') */
  lvl: string;

  /** 수정일시 */
  modify_dt: Date;
}

export interface JangbiSearchCondition {
  start_ymd : string;
  end_ymd : string;
  lvl: string;
  order_direction : string;
  search_text : string;
}

// Jangbi 목록 요청 인터페이스
export interface JangbiListRequest {
  /** 검색 시작일 (YYYYMMDD) */
  start_ymd: string;

  /** 검색 종료일 (YYYYMMDD) */
  end_ymd: string;

  /** 정렬 방향 (desc 또는 asc) */
  order_direction: 'desc' | 'asc';

  /** 검색어 */
  search_text: string;

  /** 레벨 */
  lvl: string;

  /** 시작 인덱스 */
  start_idx: number;

  /** 데이터 개수 제한 */
  limit: number;
}

export interface JangbiListItem {
  /** id */
  id: number;

  /** 구입일 */
  ymd: string;

  /** 품목 */
  item: string;

  /** 위치 */
  location?: string | null;

  /** 가격 */
  cost?: number | null;

  /** 스펙(특징) */
  spec?: string | null;

  /** 레벨 */
  lvl: string;

  /** 수정일시 */
  modify_dt: string;

  /** 첨부파일 목록 */
  attachments: string[] | null;  
}
// Jangbi 목록 응답 인터페이스
export interface JangbiListResponse {
  list: JangbiListItem[];
  item_count: number;
  next_data_exists: true,
  next_index: number;
  start_index: number;
}
interface ImageItem {
  file_name: string; // 파일 이름 (예: "IMG_20241212_220358.jpg")
  file_size: string; // 파일 크기 (바이트 단위, 문자열 형식)
  height: number | null; // 이미지 높이 (없을 경우 null)
  node_id: string; // 노드 ID (유니크 식별자)
  url: string; // 파일 URL
  width: number | null; // 이미지 너비 (없을 경우 null)
}
export interface JangbiDetailResponse {
  /** id */
  id: number;

  /** 구입일 */
  ymd: string;

  /** 품목 */
  item: string

  /** 위치 */
  location?: string | null;

  /** 가격 */
  cost?: number | null;

  /** 스펙(특징) */
  spec?: string | null;

  /** 레벨 */
  lvl: string;

  attachments: [ImageItem] | null;
}
