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

// Jangbi 목록 요청 인터페이스
export interface JangbiListRequest {
  /** 검색 시작일 (YYYYMMDD) */
  start_ymd: string;

  /** 검색 종료일 (YYYYMMDD) */
  end_ymd: string;

  /** 정렬 방향 (desc 또는 asc) */
  order_direction: 'desc' | 'asc';

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
