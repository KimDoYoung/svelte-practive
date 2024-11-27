// src/lib/api.ts
import { ApiError } from "./errors";
import { url_concat } from "./utils";

const API_BASE_URL = import.meta.env.VITE_KALPADB_API_URL_BASE;

// 공통 옵션 설정
const defaultHeaders = {
    'Content-Type': 'application/json',
};

function buildQueryString(params: Record<string, unknown>): string {
  return Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined) // null 또는 undefined 값은 제외
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`)
      .join('&');
}

// 기본 fetch 함수
async function fetchData<T>(endpoint: string, 
          options: RequestInit = {},
          params?: Record<string, unknown>

): Promise<T> {
    const queryString = params ? `?${buildQueryString(params)}` : '';
    const url = url_concat(API_BASE_URL, `${endpoint}${queryString}`);
    console.log(`API 요청 ===> ${options.method || 'GET'} ${url}`);    

    try {
        const response = await fetch(url, {
            headers: defaultHeaders,
            ...options,
        });
        if (response.status === 404) {
            throw new ApiError(404, '데이터를 찾을 수 없습니다.');
        }
        if (!response.ok) {
            throw new Error(`API 요청 실패 ===> ${endpoint}: ${response.statusText}`);
        }

        return await response.json() as T;
    } catch (error) {
        // ApiError가 이미 던져졌다면 그대로 다시 throw
        if (error instanceof ApiError) {
            throw error;
        }
        
        // 그 외 오류는 일반적인 500 상태로 처리
        console.error("API 호출 중 예기치 못한 오류 발생:", error);
        throw new ApiError(500, "API 요청이 실패했습니다. 다시 시도해 주세요.");
    }
}

// GET 요청 함수
export async function getFetch<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
  return fetchData<T>(endpoint, { method: 'GET' }, params);
}

// POST 요청 함수
export async function postFetch<T>(
  endpoint: string,
  body: unknown,
  params?: Record<string, unknown>
): Promise<T> {

  return fetchData<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
  }, params);
}

// PUT 요청 함수
export async function putFetch<T>(endpoint: string, body: unknown): Promise<T> {
    return fetchData<T>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
    });
}

// DELETE 요청 함수
export async function deleteFetch<T>(endpoint: string): Promise<T> {
    return fetchData<T>(endpoint, { method: 'DELETE' });
}


// POST 요청 함수 (multipart/form-data)
export async function postFetchMulti<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const url = url_concat(API_BASE_URL, endpoint);
    console.log(`API 요청 ===> POST (multipart) ${url}`);

    // FormData 객체 생성
    const formData = new FormData();

    // data 객체의 키-값 쌍을 FormData로 변환
    for (const key in data) {
        if (data[key] instanceof File || Array.isArray(data[key])) {
            // 파일 또는 파일 배열 처리
            if (Array.isArray(data[key])) {
                data[key].forEach((file: File) => formData.append(key, file));
            } else {
                formData.append(key, data[key] as string | Blob);
            }
        } else {
            // 일반 데이터 추가
            formData.append(key, data[key] as string | Blob);
        }
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (response.status === 404) {
            throw new ApiError(404, '데이터를 찾을 수 없습니다.');
        }
        if (!response.ok) {
            throw new Error(`API 요청 실패 ===> ${endpoint}: ${response.statusText}`);
        }

        return await response.json() as T;
    } catch (error) {
        // ApiError가 이미 던져졌다면 그대로 다시 throw
        if (error instanceof ApiError) {
            throw error;
        }
        
        // 그 외 오류는 일반적인 500 상태로 처리
        console.error("API 호출 중 예기치 못한 오류 발생:", error);
        throw new ApiError(500, "API 요청이 실패했습니다. 다시 시도해 주세요.");
    }
}
