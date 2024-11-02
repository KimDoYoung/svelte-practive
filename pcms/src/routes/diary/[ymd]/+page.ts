// src/routes/diary/[ymd]/+page.ts
import { getFetch } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const { ymd } = params; // URL에서 ymd 파라미터 추출

    try {
        // getFetch로 데이터를 가져와 반환
        const diary = await getFetch(`/diary/${ymd}`);
        return { diary }; // 페이지에서 사용할 데이터로 반환
    } catch {
        // 오류 발생 시 404 상태 코드와 메시지 반환
        return {
            status: 404,
            error: new Error('데이터를 불러오는 중 오류가 발생했습니다.')
        };
    }
};
