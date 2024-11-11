<!-- ============================================
파일명: src/lib/components/diary/DiaryForm.svelte 
설명: 다이어리 입력 폼 컴포넌트
사용법: 
    <DiaryForm {ymd} />
=============================================== -->

<script lang="ts">
  import {getFetch,  postFetchMulti, putFetch} from '$lib/api';
  import type {DiaryResponse, DiaryUpdateRequest} from '$lib/types';
  import { ApiError } from '$lib/errors';
  import MyMessage from '$lib/components/common/MyMessage.svelte';
	import YoilIcon from '../common/YoilIcon.svelte';
	import { isWeekend, todayYmd } from '$lib/utils';

  import type { Ymd } from '$lib/types'; // Add this line to import Ymd type
	import InputYmd from '../common/InputYmd.svelte';
	
    //export let ymd: Ymd = todayYmd(); // Initialize with a valid date string
    let {ymd = ''} = $props();
    let summary = $state('');
    let content = $state('');
    let message = $state('');
    // let ymd = $state(ymd1);
    // 이전 날짜로 이동
    function prevClick() {
        if ((ymd as string).length !== 8) return;
        changeDate(-1);
    }

    // 다음 날짜로 이동
    function nextClick() {
        if ((ymd as string).length !== 8) return;
        changeDate(1);
    }

    // 오늘 날짜로 이동
    function todayClick() {
        ymd = todayYmd();
        fetchDiary(ymd as string);
    }

    // 날짜 변경 함수
    function changeDate(days: number) {
        let ymd1 = ymd as string;
        const year = parseInt(ymd1.slice(0, 4));
        const month = parseInt(ymd1.slice(4, 6)) - 1;
        const day = parseInt(ymd1.slice(6, 8));
        const date = new Date(year, month, day);
        date.setDate(date.getDate() + days);
        ymd1 = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}` as Ymd;
        
        fetchDiary(ymd1);
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
            message="info:기존 데이터를 성공적으로 업데이트했습니다.";
        } catch (error) {
            console.error('날짜에 대한 데이터가 없어서 POST로 추가합니다:', error);
            if (error instanceof ApiError) {
                console.log('status:', error.status);
            }

            if (error instanceof ApiError && error.status === 404) {
                // 404 오류가 발생하면 POST 요청으로 새 데이터 생성
                if (!content && !summary) {
                    message = "error:내용이나 요약 중 하나는 입력해야 합니다.";
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
                message="info:새로운 데이터를 성공적으로 생성했습니다.";
            } else {
                console.error("저장 중 오류 발생:", error);
                message="error:저장 중 오류가 발생했습니다. 다시 시도해 주세요.";
            }
        }
    }
    // keydown 이벤트 핸들러
    function handleKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault(); // 브라우저 기본 저장 기능 막기
            saveClick();            // saveClick 함수 실행
        }else if (event.ctrlKey && event.key === 'b') {
            event.preventDefault(); // 기본 동작 방지
            const textarea = event.target as HTMLTextAreaElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = textarea.value.substring(start, end);
            const newText = `**${selectedText}**`;
            textarea.setRangeText(newText, start, end, 'end');
            const inputEvent = new Event('input', { bubbles: true });
            textarea.dispatchEvent(inputEvent);            
        }
    }
    $effect(() => {
        fetchDiary(ymd as string);
    });
</script>

<form>
    <div class="date-area">
        <!-- <input type="text" name="ymd" id="ymd" bind:value={ymd} maxlength="8"> -->
        <InputYmd {ymd} />
        <button type="button" class="icon-button" aria-label="Previous" title="요일">
            <YoilIcon {ymd} bgColor="#ccc" textColor={isWeekend(ymd as string) ? 'red': 'blue'} hanja={true} />
        </button>

        <button type="button" class="icon-button" aria-label="Previous" title="이전" onclick={prevClick}>
            <i class="fas fa-arrow-left"></i>
        </button>
        <button type="button"  class="icon-button" aria-label="Today" title="오늘" onclick={todayClick}>
            <i class="fas fa-calendar-day"></i>
        </button>
        <button type="button"  class="icon-button" aria-label="Next" title="다음" onclick={nextClick}>
            <i class="fas fa-arrow-right"></i>
        </button>
        <button type="button" class="text-button" onclick={saveClick}><i class="fas fa-save"></i>저장</button>
        
    </div>
    <div class="summary-area">
        <input type="text" name="summary" id="summary" bind:value={summary} onkeydown={handleKeyDown}>
    </div>
    <div class="content-area">
        <textarea name="content" id="content" bind:value={content} style="height:300px" onkeydown={handleKeyDown}></textarea>
    </div>
</form>
<MyMessage {message} keepSec={3}/>

<style>
    /* date-area 전체 너비와 정렬 설정 */
    .date-area {
        display: flex;
        width: 30vw; /* 전체 화면의 40% */
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
