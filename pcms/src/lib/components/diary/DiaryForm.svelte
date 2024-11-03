<!-- ============================================
파일명: src/lib/components/diary/DiaryForm.svelte 
설명: 다이어리 입력 폼 컴포넌트
사용법: 
    <DiaryForm {ymd} />
=============================================== -->

<script lang="ts">
    import {onMount} from 'svelte';
    import {getFetch, postFetch, postFetchMulti, putFetch} from '$lib/api';
    import type {DiaryResponse, DiaryUpdateRequest, DiaryRequest} from '$lib/types';
    import { ApiError } from '$lib/errors';
    import MyMessage from '$lib/components/common/MyMessage.svelte';
	import { writable } from 'svelte/store';

    export let ymd = '';
    let summary = '';
    let content = '';
    let message = writable('');  // `message`를 스토어로 설정
    // 이전 날짜로 이동
    function prevClick() {
        if (ymd.length !== 8) return;
        changeDate(-1);
    }

    // 다음 날짜로 이동
    function nextClick() {
        if (ymd.length !== 8) return;
        changeDate(1);
    }

    // 오늘 날짜로 이동
    function todayClick() {
        ymd = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        fetchDiary(ymd);
    }

    // 날짜 변경 함수
    function changeDate(days: number) {
        const year = parseInt(ymd.slice(0, 4));
        const month = parseInt(ymd.slice(4, 6)) - 1;
        const day = parseInt(ymd.slice(6, 8));
        const date = new Date(year, month, day);
        date.setDate(date.getDate() + days);
        ymd = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        
        fetchDiary(ymd);
    }
    
    async function fetchDiary(ymd: string) {
        try {
            const response = await getFetch<DiaryResponse>(`diary/${ymd}`);
            if(response) {
                summary = response.summary?? "";
                content = response.content?? "";
                // Scroll to the bottom of the textarea
                const textarea = document.getElementById('content');
                if (textarea) {
                    textarea.scrollTop = textarea.scrollHeight;
                    textarea.focus();
                }
            }
            console.log(response);
        } catch (error) {
            console.error('Failed to fetch diary:', error);
            summary = "";
            content = "";            
        }
    }
    // 저장 버튼 클릭 시 호출되는 함수
    async function saveClick() {
        try {
            console.log('saveClick:', ymd, summary, content);
            // 다이어리 데이터 조회
            await getFetch<DiaryResponse>(`diary/${ymd}`);

            // 데이터가 존재하면 PUT 요청으로 업데이트
            const updateData: DiaryUpdateRequest = {
                content: content || null,
                summary: summary || null,
            };
            await putFetch(`diary/${ymd}`, updateData);
            message.set("info:기존 데이터를 성공적으로 업데이트했습니다.");
        } catch (error) {
            console.error('날짜에 대한 데이터가 없어서 POST로 추가합니다:', error);
            if (error instanceof ApiError) {
                console.log('status:', error.status);
            }

            if (error instanceof ApiError && error.status === 404) {
                // 404 오류가 발생하면 POST 요청으로 새 데이터 생성
                if (!content && !summary) {
                    message.set("error:내용이나 요약 중 하나는 입력해야 합니다.");
                    return;
                }
                const createData = {
                    ymd, 
                    content: content || null,
                    summary: summary || null,
                    file : []
                };
                console.log('createData:', createData);
                await postFetchMulti(`diary`, createData);
                message.set("info:새로운 데이터를 성공적으로 생성했습니다.");
            } else {
                console.error("저장 중 오류 발생:", error);
                message.set("error:저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    }
    // keydown 이벤트 핸들러
    function handleKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault(); // 브라우저 기본 저장 기능 막기
            saveClick();            // saveClick 함수 실행
        }
    }
    onMount(() => {
        fetchDiary(ymd);
    });    
</script>

<form>
    <div class="date-area">
        <input type="text" name="ymd" id="ymd" bind:value={ymd} maxlength="8">
        <button type="button" class="icon-button" aria-label="Previous" title="이전" on:click={prevClick}>
            <i class="fas fa-arrow-left"></i>
        </button>
        <button type="button"  class="icon-button" aria-label="Today" title="오늘" on:click={todayClick}>
            <i class="fas fa-calendar-day"></i>
        </button>
        <button type="button"  class="icon-button" aria-label="Next" title="다음" on:click={nextClick}>
            <i class="fas fa-arrow-right"></i>
        </button>
        <button type="button" class="text-button" on:click={saveClick}><i class="fas fa-save"></i>저장</button>
        
    </div>
    <div class="summary-area">
        <input type="text" name="summary" id="summary" bind:value={summary} on:keydown={handleKeyDown}>
    </div>
    <div class="content-area">
        <textarea name="content" id="content" bind:value={content} style="height:300px" on:keydown={handleKeyDown}></textarea>
    </div>
</form>
<MyMessage {message} keepSec={3}/>

<style>
    /* date-area 전체 너비와 정렬 설정 */
    .date-area {
        display: flex;
        width: 40vw; /* 전체 화면의 40% */
        /*max-width: 400px; /* 최대 너비 제한 (선택 사항) */
        gap: 5px;
        align-items: center; /* 아이템을 세로로 중앙 정렬 */
    }
    textarea {
        width: 100%;
        padding: 8px;
        font-size: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    /* input 스타일 */
    input[type="text"] {
        flex: 1; /* 입력 필드가 가능한 넓게 차지 */
        padding: 8px;
        font-size: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 40px; /* 버튼과 동일한 높이로 설정 */
        box-sizing: border-box;
    }

    /* button 스타일 */
    .icon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px; /* 버튼과 input을 동일한 높이로 */
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        background-color: #ccc;
    }
    .text-button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px; /* 버튼과 input을 동일한 높이로 */
        border: none;
        background-color: cornflowerblue;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        width: 120px;
    }

</style>
