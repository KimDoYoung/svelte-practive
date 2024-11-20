<!-- 파일명 routes/diary/+page.svelte-->
<script lang="ts">
  import { getFetch } from '$lib/api';
	import DiaryForm from '$lib/components/diary/DiaryForm.svelte';
  import DiaryNavButtons  from '$lib/components/diary/DiaryNavButtons.svelte';
  import type { DiaryPageModel, DiaryResponse } from '$lib/types';
  import { displayYmd, isSaterday, isSunday, todayYmd } from '$lib/utils';
  import { onMount } from 'svelte';

	let diaries: DiaryResponse[]=[];
  let isLoading = true; // 로딩 상태 변수 추가
    
  let showForm = false;
  let showList = true;
  let today = todayYmd(); // 오늘 날짜를 가져옴
  // API 호출 로직을 함수로 분리
  async function loadDiaries() {
      isLoading = true;
      try {
          const response = await getFetch<DiaryPageModel>(`/diaries`);
          diaries = [...diaries, ...response.data]; // 새로운 데이터를 기존 데이터에 추가
      } catch (error) {
          console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
          isLoading = false;
      }
  }
    // 페이지가 처음 로드될 때 호출
  onMount(loadDiaries);

  function nextClickPage() {
    console.log('next page');
  }
  function prevClickPage() {
    console.log('prev page');
  }
  function currentClickPage() {
    console.log('current page');
  }
</script>

<div class="diary-list">
    <section class="content list-area">
        <div class="control-box">
          <label>
            <input type="checkbox" bind:checked={showList}/> List
          </label>
          <label>
              <input type="checkbox" bind:checked={showForm}/> Form
          </label>        
        </div>
        {#if showList}
        <div>
            {#if isLoading}
                <p>Loading...</p>
            {:else if diaries.length === 0}
                <p>No data</p>
            {:else}
                <ul>
                    {#each diaries as diary}
                        <li>
                            <p class="diary-summary">
                                {#if isSaterday(diary.ymd)}
                                <span class="text-saterday">{displayYmd(diary.ymd, true)}</span>
                                {:else if isSunday(diary.ymd)}
                                <span class="text-sunday">{displayYmd(diary.ymd, true)}</span>
                                {:else}
                                <span>{displayYmd(diary.ymd, true)}</span>
                                {/if}
                                <a href="/diary/{diary.ymd}" class="anchor">{diary.summary}</a>
                                {#if diary.attachments && diary.attachments.length > 0}
                                    <span>({diary.attachments.length})</span>
                                {/if}
                            </p>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
        <div class="control-box">
          <DiaryNavButtons 
            nextClick={nextClickPage} 
            prevClick={prevClickPage}
            currentClick={currentClickPage}
          />           
        </div>
        {/if}
    </section>

    <section class="content form-area">
        {#if showForm}
            <DiaryForm ymd={today} />
        {/if}
    </section>
</div>

<style>
    .control-box{
        display: flex;
        flex-direction: row; /* 기본 값으로, 가로 정렬 */
        justify-content: flex-start; /* 왼쪽 정렬 */
        align-items: center; /* 수직 가운데 정렬 */
        margin-bottom: 10px;   
        gap: 10px; /* 아이템 간 X축 간격 설정 */
    }

    .diary-summary {
        text-align: left;
        margin: 0;
        font-size: smaller;
    }
  
    ul {
        padding: 0; /* 기본 패딩 제거 */
        margin: 0; /* 기본 마진 제거 */
    }
    ul > li {
        list-style-type: none;
    }
    .anchor {
      text-decoration: none; /* 밑줄 제거 */
      color: inherit; /* 링크 색상을 부모 요소에 따라 설정 */
      padding: 0.2em 0.4em; /* 클릭 영역 확대 */
      transition: background-color 0.2s ease; /* 부드러운 전환 효과 */
    }

    .anchor:hover {
      background-color: rgba(0, 0, 0, 0.05); /* 엷은 회색 배경 */
      border-radius: 4px; /* 모서리를 둥글게 */
    } 
    .text-saterday {
        color: blue;
    }
    .text-sunday {
        color: red;
    }
</style>