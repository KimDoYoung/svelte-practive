<!-- 파일명 routes/diary/+page.svelte-->
<script lang="ts">
    import { page } from '$app/stores';
    import NavBar from '$lib/components/NavBar.svelte';
    import { fetchData } from '$lib/api';
    import type { DiaryPageModel, DiaryResponse } from '$lib/types';
    import { onMount } from 'svelte';

	let diaries: DiaryResponse[]=[];
    let isLoading = true; // 로딩 상태 변수 추가
    let summaryOnly = true; // 요약 보기 여부 변수 추가
    // API 호출 로직을 함수로 분리
    async function loadDiaries() {
        isLoading = true;
        try {
            const response = await fetchData<DiaryPageModel>(`diaries`);
            diaries = [...diaries, ...response.data]; // 새로운 데이터를 기존 데이터에 추가
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        } finally {
            isLoading = false;
        }
    }
    // 페이지가 처음 로드될 때 호출
    onMount(loadDiaries);

    function displayYmd(ymd: string, displayYoil=false): string {
	    let s =  `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
        if (displayYoil) {
            const yoil = ['일', '월', '화', '수', '목', '금', '토'];
            const date = new Date(s);
            s += `(${yoil[date.getDay()]})`;
        }
        return s;
	}
	// content 문자열 포맷팅: \r\n -> <br />, **text** -> <strong>text</strong>
	function displayContent(content: string | null | undefined): string {
	    if (!content) return '';
	    // 줄바꿈을 <br>로, **bold text**를 <strong>bold text</strong>로 변환
	    return content
	        .replace(/\r\n|\n/g, '<br />')
	        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
	}    
</script>

<main class="container">
    <!-- Nav Bar -->
    <NavBar />
    <!-- Main Content -->
    <section class="control-box">
        <label>
            <input type="checkbox" bind:checked={summaryOnly}/>
            Summary only
        </label>
        <a href="/diary/insert">추가</a>
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
                            <p class="diary-summary">{displayYmd(diary.ymd, true)} {diary.summary}
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
</main>

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