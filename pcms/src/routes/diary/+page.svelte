<!-- 파일명 routes/diary/+page.svelte-->
<script lang="ts">
  import { getFetch } from '$lib/api';
	import ColorDisplayYmd from '$lib/components/common/ColorDisplayYmd.svelte';
	import DiaryForm from '$lib/components/diary/DiaryForm.svelte';
  import DiaryNavButtons  from '$lib/components/diary/DiaryNavButtons.svelte';
  import type {  DiaryPageModel, DiaryResponse } from '$lib/types';
  import { todayYmd } from '$lib/utils';
  import { toYmd } from '$lib/utils';
  import { fade } from 'svelte/transition';
  


  let today = todayYmd(); // 오늘 날짜를 가져옴

	let diaries: DiaryResponse[]=[];
  let isLoading = true; // 로딩 상태 변수 추가
    
  let showForm = true;
  let showList = true;

  let page = 1;  

  const getListParam = (page:number) => {
    return {
      start_ymd :'19000101',
      end_ymd: '99991231',
      start_index: (page - 1) * 10,
      limit: 10,
      search_text:  null,
      order: 'desc',
      summary_only: 'true'
    }
  }
  
  // API 호출 로직을 함수로 분리
  async function loadDiaries(page:number = 1) {
      isLoading = true;
      try {
          const response = await getFetch<DiaryPageModel>(`/diaries`, getListParam(page));
          diaries = [...response.data]; // 새로운 데이터를 기존 데이터에 추가
          console.log('diaries:', diaries);
      } catch (error) {
          console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
          isLoading = false;
      }
  }
  // 페이지가 처음 로드될 때 호출
  //onMount(loadDiaries);
  loadDiaries();
  function prevClick() {
    console.log('next page');
    page += 1;
    loadDiaries(page);
  }
  function nextClick() {
    if (page > 1) {
      page -= 1;
      loadDiaries(page);
    }
    console.log('prev page');
  }
  function currentClick() {
    page = 1;
    loadDiaries(page);
  }
  function goView(ymd: string) {
    return () => {
      console.log('goView:', ymd);
      window.location.href = `diary/${ymd}`;
    }
  }
  function formKeyPressed(event: KeyboardEvent) {
    if(event.ctrlKey && event.key === 'm') {
      showList = !showList;
    }
  }
</script>  
<div class="diary-list"  transition:fade>
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
                              <a href="#none" class="anchor" onclick={()=>{today= toYmd(diary.ymd)}}><ColorDisplayYmd ymd={diary.ymd} /></a>
                              <a href="#none" class="anchor" onclick={goView(diary.ymd)}>{diary.summary}</a>
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
          <DiaryNavButtons {nextClick} {prevClick} {currentClick} />           
        </div>
        {/if}
    </section>
</div>
{#if showForm}
<div>
  <section class="content form-area">
    <DiaryForm ymd={today} {formKeyPressed}/>
  </section>
</div>
{/if}  

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
</style>  