<!-- ============================================
파일명: src/lib/components/diary/DiaryView.svelte 
설명: 다이어리 보기 컴포넌트
사용법: 
    <DiaryView {ymd} />
=============================================== -->
<script lang="ts">
    import { getFetch } from '$lib/api';
    import type { DiaryResponse } from '$lib/types'; // Adjust the import path as necessary
    import {onMount} from 'svelte';
    export let ymd: string = '';
    let diary: DiaryResponse | null = null;

    async function fetchDiary(ymd: string) {
        try {
            diary = await getFetch<DiaryResponse>(`diary/${ymd}`);
            console.log("response:", diary);
        } catch (error) {
            console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
        }
    }    

    onMount(() => {
        console.log('ymd:', ymd);
        fetchDiary(ymd);
    });
</script>
<p>날짜: {diary?.ymd}</p>
<p>요약: {diary?.summary}</p>
<p>내용: {diary?.content}</p>
<style>
</style>