import { ApiError } from "./errors";

// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_KALPADB_API_URL_BASE;

// 공통 옵션 설정
const defaultHeaders = {
    'Content-Type': 'application/json',
};

// 기본 fetch 함수
async function fetchData<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/${endpoint}`;
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
        console.error("API 호출 중 오류 발생:", error);
        throw new ApiError(500, "API 요청이 실패했습니다. 다시 시도해 주세요.");
    }
}

// GET 요청 함수
export async function getFetch<T>(endpoint: string): Promise<T> {
    return fetchData<T>(endpoint, { method: 'GET' });
}

// POST 요청 함수
export async function postFetch<T>(endpoint: string, body: unknown): Promise<T> {
    return fetchData<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });
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
