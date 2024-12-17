<!-- 파일명 : JangbiSearch.svelte -->
<script lang="ts">
</script>
<div class="search-area grid">
  <input type="date" id="start_ymd" value="" />
  ~
  <input type="date" id="end_ymd"  value=""/>
  <select id="order_direction">
    <option value="desc">내림차순</option>
    <option value="asc">오름차순</option>
  </select>
  <select id="lvl">
    <option value="">전체</option>
    <option value="1">실망</option>
    <option value="2">보통</option>
    <option value="3">만족</option>
  </select>  
  <input type="text" id="search_text" placeholder="검색어" />
  <input type="button" value="검색" />
  <input type="button" class="secondary" value="추가" />

</div>
<style>
  .search-area {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid #ec8c8c;
    border-radius: 5px;
  }
  .search-area input {
    margin-right: 10px;
  }
  .search-area select {
    margin-right: 10px;
  }

</style>