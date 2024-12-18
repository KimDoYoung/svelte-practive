<!-- 파일명 : JangbiSearch.svelte -->
<script lang="ts">
  import type { JangbiSearchCondition } from "$lib/types";
  type JangiSearchType = {
    searchButtonClick : (search_condition: JangbiSearchCondition) => void,
    newButtonClick : () => void,
    initButtonClick : (search_condition: JangbiSearchCondition) => void,
  }
  let { searchButtonClick, initButtonClick, newButtonClick} : JangiSearchType = $props();
  let search_condition : JangbiSearchCondition = $state({
    start_ymd : '',
    end_ymd : '',
    lvl: '',
    order_direction : 'desc',
    search_text : '',
  });
  let initButtonHandler = () => {
    search_condition = {
      start_ymd : '',
      end_ymd : '',
      lvl: '',
      order_direction : 'desc',
      search_text : '',
    }
    initButtonClick(search_condition);
  }
</script>
<div class="search-area grid">
  <input type="date" id="start_ymd" bind:value={search_condition.start_ymd} />
  ~
  <input type="date" id="end_ymd"  bind:value={search_condition.end_ymd}/>
  <select id="order_direction" bind:value={search_condition.order_direction}>
    <option value="desc">내림차순</option>
    <option value="asc">오름차순</option>
  </select>
  <select id="lvl" bind:value={search_condition.lvl}>
    <option value="">전체</option>
    <option value="1">실망</option>
    <option value="2">보통</option>
    <option value="3">만족</option>
  </select>  
  <input type="text" id="search_text" bind:value={search_condition.search_text} placeholder="검색어" />
  <div role="group">
    <input type="button" value="검색" onclick={()=>searchButtonClick(search_condition)}/>
    <input type="button" value="초기화" onclick={initButtonHandler}/>
    <input type="button" class="secondary" value="추가" onclick={newButtonClick}/>
  </div>
</div>
<style>
  .search-area {
    display: flex;
    justify-content: flex-start;
    padding: 5px;
    border-bottom: 1px solid #ec8c8c;
    border-radius: 5px;
    
  }
  .search-area input {
    margin-right: 10px;
    font-size:0.8rem;
  }
  .search-area select {
    margin-right: 10px;
    font-size:0.8rem;
  }
  .search-area input[type="button"] {
    /* font-size:0.8rem; */
    padding-left: 0px;
    padding-right: 0px;
  }

</style>