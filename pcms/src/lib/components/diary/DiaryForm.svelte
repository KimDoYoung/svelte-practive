<!-- ============================================
파일명: src/lib/components/diary/DiaryForm.svelte 
설명: 다이어리 입력 폼 컴포넌트
사용법: 
    <DiaryForm {ymd} />
=============================================== -->

<script lang="ts">
  import type { DiaryResponse, DiaryUpdateRequest} from '$lib/types';
  import type { Ymd } from '$lib/types'; // Add this line to import Ymd type
  import { ApiError } from '$lib/errors';
  import {getFetch,  postFetchMulti, putFetch} from '$lib/api';
	import { generateHashCode, todayYmd } from '$lib/utils';
  import Alert from '$lib/components/common/Alert.svelte';
	import ColorDisplayYmd from '../common/ColorDisplayYmd.svelte';
	import AttachUploader from '../common/AttachUploader.svelte';
	import { ModalManager } from '../common/ModalManager.svelte';
	import EmojiPicker from './EmojiPicker.svelte';
  //TODO : 수정되었다는 것과 save버튼과 연동
  //TODO : 10초마다 자동저장 
  //TODO: 단어 선택 ctrl+shift+H -> 한자 가져오기  (선택영역의 글자->보내기+ 받아서 1개이면 바로 한자로 변환, 2개이상이면 단어로 변환, 모두 넣고 지우자)
  type DiaryFormType = {
    ymd: Ymd;
    formKeyPressed : (event: KeyboardEvent) => void;
  }
  let {ymd, formKeyPressed}: DiaryFormType  = $props(); 
  
	let summary = $state('');
  let content = $state('');
  let fetchedHashCode = 0;


  // 변경 여부 확인
  function changed() {
    const newHashCode = generateHashCode(summary + content);
    return newHashCode !== fetchedHashCode;
  }

  // 이전 날짜로 이동
  function prevClick() {
      if ((ymd as string).length !== 8) return;
      if (changed()) {
        console.log('next button clicked changed true ' + ymd);
        saveClick().then(() => {
          changeDate(-1);
        });
      } else {
        changeDate(-1);
      }
  }

  // 다음 날짜로 이동
  function nextClick() {
    if ((ymd as string).length !== 8) return;
    if (changed()) {
      console.log('next button clicked changed true ' + ymd);
      saveClick().then(() => {
        changeDate(1);
      });
    }else {
      changeDate(1);
    }
  }

  // 오늘 날짜로 이동
  function todayClick() {
    if (changed()) {
      console.log('today button clicked changed true ' + ymd);
        saveClick().then(() => {
          ymd = todayYmd();
          fetchDiary(ymd as string);
        });
    } else {   
      ymd = todayYmd();
      fetchDiary(ymd as string);
    }
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
      ymd =  ymd1 as Ymd;
  }
  
  async function fetchDiary(ymd: string) {
      try {
          const response = await getFetch<DiaryResponse>(`diary/${ymd}`);
          if(response) {
              summary = response.summary?? "";
              content = response.content?? "";
              fetchedHashCode = generateHashCode(summary + content);
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
          fetchedHashCode = generateHashCode(summary + content);
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
          await putFetch(`diary/${ymd}`, updateData).then((response) => {
              console.log('response:', response);
              alertRef?.showAlert("데이터를 성공적으로 업데이트했습니다.", "info", 1000);
              fetchedHashCode = generateHashCode(summary + content);
          });
          
      } catch (error) {
          console.error('날짜에 대한 데이터가 없어서 POST로 추가합니다:', error);

          if (error instanceof ApiError && error.status === 404) {
              // 404 오류가 발생하면 POST 요청으로 새 데이터 생성
              if (!content && !summary) {
                alertRef?.showAlert("내용이나 요약 중 하나는 입력해야 합니다.", "error", 1000);
                return;
              }
              const createData = {
                  ymd, 
                  content: content || null,
                  summary: summary || null,
                  file : []
              };
              console.log('createData:', createData);
              await postFetchMulti(`diary`, createData).then((response) => {
                  console.log('response:', response);
                  alertRef?.showAlert("데이터를 성공적으로 생성했습니다.", "info", 1000)
                  fetchedHashCode = generateHashCode(summary + content);
              });
          } else {
              console.error("저장 중 오류 발생:", error);
              alertRef?.showAlert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.", "error", 1000);
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
      }else if (event.ctrlKey && event.key === 'm') {
          event.preventDefault(); // 기본 동작 방지
          formKeyPressed(event);
      }
  }
  $effect(() => {
      fetchDiary(ymd as string);
  });
  let alertRef: Alert | null = null;
  
  //이미지 파일 올리기
  let modalManager = new ModalManager();
  const toggleAttachUploader = (event: Event) => {
    console.log('popupAttach');
    modalManager.toggleModal(event);
  }  
</script>

<form>
    <div class="date-area">
        <ColorDisplayYmd {ymd} />

        <button type="button" class="icon-button" aria-label="Previous" title="이전" onclick={prevClick}>
            <i class="fas fa-arrow-left"></i>
        </button>
        <button type="button"  class="icon-button" aria-label="Today" title="오늘" onclick={todayClick}>
            <i class="fas fa-calendar-day"></i>
        </button>
        <button type="button"  class="icon-button" aria-label="Next" title="다음" onclick={nextClick}>
            <i class="fas fa-arrow-right"></i>
        </button>
        <button type="button" class="text-button" title="저장"  aria-label="저장" onclick={saveClick}>
          <i class="fas fa-save"></i>
        </button>
        <button type="button" class="text-button" title="이미지파일올리기" onclick="{(event)=>toggleAttachUploader(event)}" data-target="diary-attach" aria-label="이미지 첨부"><i class="fa-solid fa-upload"></i></button>
        
    </div>
    <div class="summary-area">
        <input type="text" name="summary" id="summary" bind:value={summary} onkeydown={handleKeyDown}>
    </div>
    <div class="content-area">
        <textarea name="content" id="content" bind:value={content} style="height:300px;" onkeydown={handleKeyDown}></textarea>
    </div>
    <EmojiPicker textareaId="content"/>
</form>
<Alert bind:this={alertRef}/>
<AttachUploader target="일기" ymd={ymd} modalId="diary-attach" uploadedImage={()=>{alert('uploaded')}}/>
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
        /* height: 300px; */
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
        color: white;
        border-radius: 4px;
        cursor: pointer;
        background-color: #526b69;
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
