<!-- 
  파일명 : jangbi/+page.svelte 
-->
<script lang="ts">
  import { getFetch } from '$lib/api';
  import type { JangbiListRequest, JangbiListResponse, JangbiSearchCondition } from '$lib/types/jangbi';
  import JangbiList from '$lib/components/jangbi/JangbiList.svelte';
  import JangbiSearch from '$lib/components/jangbi/JangbiSearch.svelte';
	import { migrate } from 'svelte/compiler';
	import { page } from '$app/stores';
  
  let {data}= $props();
  let mode = $state('list');

  let pageNo = 1;
  let param : JangbiListRequest = {
    start_ymd : '19700101',
    end_ymd : '99991213',
    order_direction : 'desc',
    lvl : '',
    search_text : '',
    start_idx: (pageNo - 1) * 10,
    limit : 10
  }
  const loadData = () => {
    const url = `/jangbies`;
    param.start_idx = (pageNo - 1) * 10;
    console.log("params:", param);
    getFetch<JangbiListResponse>(url, param as unknown as Record<string,unknown>).then((res) => {
      data = res;
      console.log("data:",data);
    });
  }
  //이전 버튼 클릭시
  const prevDataLoad = () => {
    pageNo--;
    if(pageNo < 1) {
      pageNo = 1;
    }
    loadData();
  };
  //다음 버튼 클릭시
  const nextDataLoad = () => {
    pageNo++;
    loadData();
  };
  //검색버튼 클릭
  const searchButtonClick = (condition: JangbiSearchCondition) => {
    let sYmd = condition.start_ymd.replace(/-/g, '');
    let eYmd = condition.end_ymd.replace(/-/g, '');
    if (sYmd == '') {
      sYmd = '19700101';
    }
    if (eYmd == '') {
      eYmd = '99991231';
    }
    param = {
      start_ymd : sYmd,
      end_ymd : eYmd,
      order_direction : condition.order_direction as 'desc' | 'asc',
      lvl : condition.lvl,
      search_text : condition.search_text,
      start_idx: 0,
      limit : 10
    }
    pageNo = 1;
    console.log("searchButtonClick:", JSON.stringify(condition, null, 2));
    loadData();
  }
  const initButtonClick = (condition: JangbiSearchCondition) => {
    param = {
      start_ymd : '19990101',
      end_ymd : '99990101',
      order_direction : 'desc',
      lvl : '',
      search_text : '',
      start_idx: 0,
      limit : 10
    }
    pageNo = 1;
    loadData();
  }
  //신규버튼 클릭
  const newButtonClick = () => {
    console.log("newButtonClick");
    mode = 'insert';
  }

</script>
<section class="section-list" class:invisible={mode !== 'list'} class:visible={mode === 'list'}>
  <div class="search-area">
    <JangbiSearch {searchButtonClick} {initButtonClick} {newButtonClick}/>
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
</section> 
<section class="section-insert" class:invisible={mode !== 'insert'} class:visible={mode === 'insert'}>
  <div>추가화면</div>
</section>
<section class="section-update" class:invisible={mode !== 'update'} class:visible={mode === 'update'}>
  <div>수정화면</div>
</section>
<style>
  .section-list {
    font-size: 0.8rem;
  }
  .button-area {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
  }
  .button-area button{
    margin-right: 10px;
  }
  .invisible {
    display: none;
  }
  .visible {
    display: block;
  }
</style>