<!-- 파일명 : EssayList.svelte.svelte -->
<script lang="ts">
  import type { EssayListResponse} from '$lib/types';
  type EssayListProps = {
    data: EssayListResponse;
    pageNo: number;
    deleteClick : (id:number) => void;
    viewClick : (id:number) => void;
    editClick : (id:number) => void;
  };
  let {data, pageNo, deleteClick, viewClick, editClick} : EssayListProps = $props();
</script>
{#if data.list.length > 0}
  {#each data.list as item, index}
  <div class="small-char">
    <p class="item-no">{(pageNo - 1)*data.page_size  + index+1}</p>
    <p class="item-title"><a href="#none" onclick={()=>viewClick(item.id)}>{item.title}</a></p>
    <p class="action-buttons">
      <a href="#none" aria-label="수정" data-id={item.id} onclick={()=>{editClick(item.id)}}><i class="fa fa-edit"></i></a>
      <a href="#none" aria-label="삭제" data-id={item.id} onclick={()=>{deleteClick(item.id)}}><i class="fa fa-trash"></i></a>
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
  .action-buttons {
    display: inline-block;
    width: 100px;
  }
</style>