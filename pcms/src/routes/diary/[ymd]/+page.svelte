<script lang="ts">
    import type { DiaryDetailResponse } from '$lib/types';
    export let diary: DiaryDetailResponse;
</script>

{#if diary}
    <h1>{diary.ymd} : {diary.summary}</h1>
    <p>{diary.content}</p>
{:else}
    <p>데이터가 없습니다.</p>
{/if}
