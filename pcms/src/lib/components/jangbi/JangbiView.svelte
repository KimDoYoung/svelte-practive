<!-- 파일명 : JangbiView.svelte -->
<script lang="ts">
  import { DateYmdUtil } from '$lib/utils/date_ymd_util';
  import { displayMoney, displayContent } from '$lib/utils/commonUtils';
  import type { JangbiDetailResponse } from '$lib/types/jangbi';
	import ImageCard from '../common/ImageCard.svelte';

  type JangbiViewProps = {
    jangbi: JangbiDetailResponse;
    backtoButtonClick : () => void;
  };
  let {jangbi, backtoButtonClick} : JangbiViewProps = $props();
  const lvlText = (lvl: string) => {
    if (lvl === "1") {
      return '😡 실망';
    } else if (lvl === "2") {
      return '🙁 보통';
    } else if (lvl === "3") {
      return '😃 만족';
    }
  }
  //edit
  const editButtonClick = () => {
    const id = jangbi.id;
    window.location.href = `/jangbi/${id}`;
  }
</script>
<h1>{jangbi.item} 
  <span><a href="#none" aria-label="List" onclick={backtoButtonClick}><i class="fa fa-list"></i></a></span>
  <span><a href="#none" aria-label="Edit" onclick={editButtonClick}><i class="fa fa-edit"></i></a></span>
</h1>
<p> 구일일자 : {DateYmdUtil.displayYmdYoil(jangbi.ymd)}</p>
<p> 장소 : {jangbi.location}</p>
<p> 가격 : {displayMoney(jangbi.cost ?? 0)}</p>
<p> 만족 : {lvlText(jangbi.lvl)}</p>
<p> 스펙 : {@html displayContent(jangbi.spec)}</p>
{#if jangbi.attachments}
  <div class="image-container">
    {#each jangbi.attachments as image, index}
      <!-- <img src={image.url} alt={image.file_name || 'Image'} style="width: 100%;"/> -->
      <ImageCard apfile={image} />
    {/each}
  </div>
{/if}
<style>
.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 반응형 열 생성 */
  gap: 1rem; /* 카드 사이의 간격 */
  box-sizing: border-box;
}
</style>