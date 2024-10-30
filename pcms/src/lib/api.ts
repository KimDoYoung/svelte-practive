// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_KALPADB_API_URL_BASE;

export async function fetchData<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/${endpoint}`;
    console.log(`API 데이터 가져오기 ===> ${url}`);

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`API 데이터 가져오기 실패 ===> ${endpoint}: ${response.statusText}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        throw new Error("API 요청이 실패했습니다. 다시 시도해 주세요.");
    }
}

// export async function fetchData(endpoint: string, options = {}) {
//     const url = `${API_BASE_URL}/${endpoint}`;
//     console.log(`API 데이터 가져오기 ===> ${url}`);
//     const response = await fetch(url, options);
    
//     if (!response.ok) {
//         throw new Error(`API 데이터 가져오기 실패 ===> ${endpoint}: ${response.statusText}`);
//     }
    
//     return await response.json();
// }
