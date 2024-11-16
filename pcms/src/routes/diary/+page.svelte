<!-- 파일명 routes/diary/+page.svelte-->
<script lang="ts">
  import { getFetch } from '$lib/api';
	import DiaryForm from '$lib/components/diary/DiaryForm.svelte';
  import DiaryNavButtons  from '$lib/components/diary/DiaryNavButtons.svelte';
  import type { DiaryPageModel, DiaryResponse } from '$lib/types';
  import { displayYmd, displayContent, todayYmd } from '$lib/utils';
  import { onMount } from 'svelte';

	let diaries: DiaryResponse[]=[];
    let isLoading = true; // 로딩 상태 변수 추가
    let summaryOnly = true; // 요약 보기 여부 변수 추가
    let showForm = false;
    let showList = true;
    let today = todayYmd(); // 오늘 날짜를 가져옴
    // API 호출 로직을 함수로 분리
    async function loadDiaries() {
        isLoading = true;
        try {
            const response = await getFetch<DiaryPageModel>(`diaries`);
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
    <section class="control-box">
        <label>
            <input type="checkbox" bind:checked={summaryOnly}/> Summary only
        </label>
        <label>
            <input type="checkbox" bind:checked={showList}/> List
        </label>
        <label>
            <input type="checkbox" bind:checked={showForm}/> Form
        </label>        
        <!-- <DiarySearch /> -->
    </section>
    <section class="content list-area">
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
                            <p class="diary-summary">{displayYmd(diary.ymd, true)} <a href="/diary/{diary.ymd}">{diary.summary}</a>
                                {#if diary.attachments && diary.attachments.length > 0}
                                    <span>({diary.attachments.length})</span>
                                {/if}
                            </p>
                            {#if !summaryOnly}
                            <p class="diary-content">{@html displayContent(diary.content)}</p>
                            {/if}                            
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
            hometext="Current"
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
    .control-icon{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        background-color: #6ecefa;
        color: white;
        border: none;
        border-radius: 10%;
        cursor: pointer;
    }
    .diary-summary {
        text-align: left;
        margin: 0;
    }
    .diary-content {
        text-align: left;
        margin: 0;
        background-color: aliceblue;
        font-size: medium;
    }    
    ul {
        padding: 0; /* 기본 패딩 제거 */
        margin: 0; /* 기본 마진 제거 */
    }
    ul > li {
        list-style-type: none;
    }      
</style>