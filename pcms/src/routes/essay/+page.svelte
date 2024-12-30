<script lang="ts">
  import { onMount } from 'svelte';
  let {data} = $props();
//let pageNo = $derived( Math.ceil((data.start_index + data.essays.length) / data.item_count ));
// let pageNo:number = $derived.by( ()=> {
//   return Math.ceil((data.start_index + data.essays.length) / data.item_count);
// });
  $effect(() => {
    console.log('컴포넌트가 마운트되었습니다.');
    return () => {
          console.log('컴포넌트가 언마운트되었습니다.');
          // 정리 작업 수행
      };
  });

</script>
{#if data.list.length > 0}
<div>
  {#each data.list as item, index}
  {@const pageNo = Math.ceil((data.start_index + data.data_count) / data.page_size)}
    <div class="small-char">
      <p class="item-no">{(pageNo - 1)*data.page_size  + index+1}</p>
      <p class="item-title">{item.title}</p>
    </div>
  {/each}
</div>
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