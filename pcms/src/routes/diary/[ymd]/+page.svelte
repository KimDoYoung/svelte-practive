
<script lang="ts">
	import { displayYmd, displayContent } from '$lib/utils';
  import type { PageData } from './$types';
  export let data: PageData; // PageData 타입을 통해 `data`가 안전하게 사용 가능
  const { diary } = data;    
</script>

{#if diary}
    <h3>{displayYmd(diary.ymd)} : {diary.summary}</h3>
    <p>{@html displayContent(diary.content)}</p>
{:else}
    <p>데이터가 없습니다.</p>
{/if}

<style>

</style>
