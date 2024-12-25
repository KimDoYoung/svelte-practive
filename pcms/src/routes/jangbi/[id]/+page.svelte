<script lang="ts">
	import { displayMoney, displayContent } from '$lib/utils/commonUtils.js';
	import { DateYmdUtil } from '$lib/utils/date_ymd_util.js';

  import { SnoteCrypto } from '$lib/utils/snote_crypto';
  import { onMount } from 'svelte';
  let {data} = $props();
  onMount(() => {
    console.log(data);
  });
  const lvlText = (lvl: string) => {
    if (lvl === "1") {
      return '😡 실망';
    } else if (lvl === "2") {
      return '🙁 보통';
    } else if (lvl === "3") {
      return '😃 만족';
    }
  }  
</script>
<h1>{data.item}</h1>
<p> 구일일자 : {DateYmdUtil.displayYmdYoil(data.ymd)}</p>
<p> 장소 : {data.location}</p>
<p> 가격 : {displayMoney(data.cost ?? 0)}</p>
<p> 스펙 : {@html displayContent(data.spec)}</p>
<p> 만족 : {lvlText(data.lvl)}</p>
<p>
  {#if data.attachments}
    {#each data.attachments as image, index}
      <img src={image.url} alt={image.file_name || 'Image'} style="width: 100%;"/>
    {/each}
  {/if}
</p>
<style>
</style>