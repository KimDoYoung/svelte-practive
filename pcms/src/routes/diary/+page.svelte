<!-- 파일명 routes/diary/+page.svelte-->
<script lang="ts">
    import { getFetch } from '$lib/api';
	import DiarySearch from '$lib/components/diary/DiarySearch.svelte';
    import type { DiaryPageModel, DiaryResponse } from '$lib/types';
    import { displayYmd, displayContent } from '$lib/utils';
    import { onMount } from 'svelte';

	let diaries: DiaryResponse[]=[];
    let isLoading = true; // 로딩 상태 변수 추가
    let summaryOnly = true; // 요약 보기 여부 변수 추가
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

  
</script>
<div class="diary-list">
    <section class="control-box">
        <label>
            <input type="checkbox" bind:checked={summaryOnly}/>
            Summary only
        </label>

        <a href="/diary/insert">추가</a>
        <!-- <DiarySearch /> -->
    </section>
    <section class="content">
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
    </section>
</div>

<style>
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