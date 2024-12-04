export interface TodoBase {
  content: string;       // 작업 내용
  done_yn: "Y" | "N";    // 완료 여부
  id: number;            // 고유 ID
  input_dt: string;      // 입력 날짜 (ISO 문자열)
  done_dt: string | null; // 완료 날짜 (null일 수도 있음)
}
