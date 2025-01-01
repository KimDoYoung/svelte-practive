<!-- 파일명 : EssayList.svelte.svelte -->
<script lang="ts">
  import type { EssayListResponse} from '$lib/types';
  type EssayListProps = {
    data: EssayListResponse;
    pageNo: number;
    deleteButtonClick : (id:number) => void;
    selectedClick : (id:number) => void;
  };
  let {data, pageNo, deleteButtonClick, selectedClick} : EssayListProps = $props();
</script>
{#if data.list.length > 0}
  {#each data.list as item, index}
  <div class="small-char">
    <p class="item-no">{(pageNo - 1)*data.page_size  + index+1}</p>
    <p class="item-title">{item.title}</p>
    <p class="buttons">
      <button onclick={() => {selectedClick(item.id)}}>보기</button>
      <button onclick={() => {deleteButtonClick(item.id)}}>삭제</button>
    </p>
  </div>
  {/each}
{:else}
    <p>데이터가 없습니다.</p>
{/if}  
<style>
  .small-char {
    font-size: 0.8rem;
  }
  .item-no {
    display: inline-block;
    width: 50px;
  }
  .item-title {
    display: inline-block;
    width: 500px;
  }
</style>