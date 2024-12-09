
export interface CalendarResponse {
  id: integer; // Primary key, auto-increment
  gubun: string; // 구분
  sorl:string; // 정렬
  ymd: string; // 일자
  content: string; // 내용
  modify_dt: string; // 수정일
}
