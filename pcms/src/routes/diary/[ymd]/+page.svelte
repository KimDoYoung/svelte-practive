
<script lang="ts">
    // import type { DiaryResponse } from '$lib/types';
    import type { PageData } from './$types';
    export let data: PageData; // PageData 타입을 통해 `data`가 안전하게 사용 가능

    // 필요한 경우 diary 추출
    const { diary } = data;    
    //export let diary: DiaryResponse | null = null;
</script>

{#if diary}
    <h1>{diary.ymd} : {diary.summary}</h1>
    <p>{diary.content}</p>
{:else}
    <p>데이터가 없습니다.</p>
{/if}
