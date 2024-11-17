<!-- ============================================
파일명: src/lib/components/diary/DiaryView.svelte 
설명: 다이어리 보기 컴포넌트
사용법: 
    <DiaryView {ymd} />
=============================================== -->
<script lang="ts">
    import { getFetch } from '$lib/api';
    import type { DiaryDetailResponse, Ymd } from '$lib/types';
	  import { displayContent, displayYmd } from '$lib/utils';

    let { ymd = '' } = $props()
    
    let diary: DiaryDetailResponse | undefined = $state<DiaryDetailResponse | undefined>(undefined);

    $effect(() => {
        console.log('ymd:', ymd);
        fetchDiary(ymd);
    });
    $inspect(()=>{
        console.log('diary:', diary);
    })
    async function fetchDiary(ymd: string) {
        try {
            diary = await getFetch<DiaryDetailResponse>(`diary/${ymd}`);
            console.log("response:", diary);
        } catch (error) {
          diary = undefined;
          console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
        }
    }    

</script>
{#if diary}
    <p class="diary-summary">{displayYmd(diary.ymd, true, true)} : {diary.summary}</p>
    <p class="diary-content">{@html displayContent(diary.content)}</p>
    {#if diary.attachments}
      <div class="container grid-responsive"> 
        {#each diary.attachments as attachment}
            <img src='{attachment.url}' alt='{diary.ymd}  첨부이미지' />
        {/each}
      </div>  
    {/if}
{:else}
    <p>데이터가 없습니다.</p>
{/if}
<style>
  .grid-responsive {
    display: grid;
    margin : 5px;
    gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 최소 300px */
  }

  .grid-responsive img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px; /* 커스텀 반경 */
  }
  .diary-summary{
    font-size: large;
    font-weight: bold;
    text-align: left;
  }
  .diary-content {
    white-space: pre-wrap;
    font-size: medium;
    text-align: left;
  }
</style>