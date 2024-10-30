// src/lib/types/diary.ts

// 기본 일기 정보
export interface DiaryBase {
    ymd: string; // 날짜 형식 (yyyymmdd)
    content?: string | null; // 내용 (선택적 필드)
    summary?: string | null; // 요약 (선택적 필드)
}

// 일기 업데이트 요청
export interface DiaryUpdateRequest {
    content?: string | null; // 내용 (선택적 필드)
    summary?: string | null; // 요약 (선택적 필드)
}

// 일기 작성/수정 요청 모델
export interface DiaryRequest {
    ymd: string; // 날짜 형식 (yyyymmdd)
    content?: string | null; // 내용 (선택적 필드)
    summary?: string | null; // 요약 (선택적 필드)
    attachments?: string[] | null; // 첨부파일 배열 (선택적 필드)
}

// 일기 응답 모델
export interface DiaryResponse {
    ymd: string; // 일자
    content?: string | null; // 내용
    summary?: string | null; // 요약
    attachments?: string[] | null; // 첨부된 images url
}

// 첨부파일 정보 모델
export interface Attachment {
    node_id: string;
    org_file_name: string;
    file_size: number;
    url: string;
}

// 상세 일기 응답 모델 (첨부파일 포함)
export interface DiaryDetailResponse {
    ymd: string; // 일자
    content?: string | null; // 내용
    summary?: string | null; // 요약
    attachments?: Attachment[] | null; // 첨부된 images url
}

// 일기 리스트 응답 모델
export interface DiaryListResponse {
    ymd: string; // 일자
    content?: string | null; // 내용
    summary?: string | null; // 요약
    attachments?: string[] | null; // 첨부된 images url
}

// 페이징된 일기 응답 모델
export interface DiaryPageModel {
    data: DiaryResponse[]; // 일기 데이터 리스트
    data_count:number; // 데이터 개수
    next_data_exists: boolean;
    last_index: number;
    limit: number;
    start_ymd?: string | null; // 선택적 시작 일자
    end_ymd?: string | null;   // 선택적 종료 일자
    order?: string | null;
}
