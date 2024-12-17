<!-- 
  파일명 : jangbi/+page.svelte 
-->
<script lang="ts">
  import { getFetch } from '$lib/api';
	import { DateYmdUtil } from '$lib/utils/date_ymd_util';
  import type { JangbiListResponse } from '$lib/types/jangbi';
  import JangbiList from '$lib/components/jangbi/JangbiList.svelte';
  import JangbiSearch from '$lib/components/jangbi/JangbiSearch.svelte';
  
  let {data}= $props();
  let pageNo = 1;

  const loadData = () => {
    const url = `/jangbies`;
    let params = {
      start_ymd : '19700101',
      end_ymd : '99991213',
      order_direction : 'desc',
      start_idx: (pageNo - 1) * 10,
      limit : 10
    }
    console.log("pageNo:",pageNo);
    console.log("params:",params);
    getFetch<JangbiListResponse>(url, params).then((res) => {
      data = res;
      console.log("data:",data);
    });
  }
  const prevDataLoad = () => {
    pageNo--;
    if(pageNo < 1) {
      pageNo = 1;
    }
    loadData();
  };
  const nextDataLoad = () => {
    pageNo++;
    loadData();
  };
</script>
<div>
  <JangbiSearch/>
</div>
{#if data.item_count === 0}
  <p>검색 결과가 없습니다.</p>
{:else}
  <JangbiList {data}/>
{/if}
<div class="button-area">
  {#if data.start_index > 0}
    <button  onclick={prevDataLoad}>이전</button>
  {/if}
  {#if data.next_data_exists}
    <button onclick={nextDataLoad}>다음</button>
  {/if}
</div>
<style>
  .button-area {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
  }
  .button-area button{
    margin-right: 10px;
  }
</style>