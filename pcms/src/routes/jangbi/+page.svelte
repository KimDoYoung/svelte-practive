<!-- 
  파일명 : jangbi/+page.svelte 
-->
<script lang="ts">
  let {data}= $props();

</script>
{#each data.list as jangbi }
  <div class="jangbi-item-container">
    <div>{jangbi.ymd}</div>
    <div>{jangbi.item}</div>
    <div>{jangbi.location}</div>
    <div>{jangbi.cost}</div>
  </div>
{/each}
<div class="button-area">
  {#if data.start_index > 0}
    <button>이전</button>
  {/if}
  {#if data.next_data_exists}
    <button>다음</button>
  {/if}
</div>
<style>
  .jangbi-item-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
</style>