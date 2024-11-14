<!-- ============================================
파일명: src/lib/components/diary/DiaryView.svelte 
설명: 다이어리 보기 컴포넌트
사용법: 
    <DiaryView {ymd} />
=============================================== -->
<script lang="ts">
    import { getFetch } from '$lib/api';
    import type { DiaryResponse, Ymd } from '$lib/types';
	  import { displayContent, displayYmd } from '$lib/utils';
    // import {onMount} from 'svelte';
    // export let ymd: string = '';
    let { ymd = '' } = $props()
    
    let diary: DiaryResponse | undefined = $state<DiaryResponse | undefined>(undefined);

    $effect(() => {
        console.log('ymd:', ymd);
        fetchDiary(ymd);
    });
    $inspect(()=>{
        console.log('diary:', diary);
    })
    async function fetchDiary(ymd: string) {
        try {
            diary = await getFetch<DiaryResponse>(`diary/${ymd}`);
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
        {#each diary.attachments as attachment}
            <img src={attachment} alt='{diary.ymd} 일기 첨부이미지' />
        {/each}
    {/if}
{:else}
    <p>데이터가 없습니다.</p>
{/if}
<style>
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