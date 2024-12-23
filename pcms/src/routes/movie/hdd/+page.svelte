<!-- 파일명 : +page.svelte -->
<script lang="ts">
  import SearchInput from "$lib/components/common/SearchInput.svelte";
  import { getFetch } from "$lib/api";
	import type { HddRequest, HddResponse } from "$lib/types";
	import { humanFileSize } from "$lib/utils/commonUtils";
  
  let data = $state<HddResponse>({
    list: [],
    data_count: 0,
    next_data_exists: false,
    start_index: 0,
    last_index: 0,
    limit: 10
  });
  let pageNo = 1;
  let params: HddRequest = {
    search_text: '',
    start_index: 0,
    limit: 100,
    volumn_name: '',
    gubun: 'A'
  }

  const searchInputClick = (keyword: string) => {
    console.log(keyword);
    params.search_text = keyword;
    params.start_index = 0;
    params.limit = 100;
    loadData();
  }

  const loadData = async () => {
    const search_params = {
      ...params,
      start_index: (pageNo - 1) * params.limit
    }
    const url = '/hdd/search';
    const res = await getFetch<HddResponse>(url, search_params)
    .then((res) => {
      data = res;
    })
    console.log(data);
  }
</script>
<section>
  <SearchInput {searchInputClick} placeholder_text="찾고자하는 키워드"/>
  <div class="list-area">
    {#if data.list.length == 0}
      <div class="empty">검색 결과가 없습니다.</div>
    {:else}
      {#each data.list as item}
        <div class="row-item">
          <div class="item-volumn-name">{item.volumn_name}</div>
          <div class="item-gubun">
            {#if item.gubun == 'D'}
            <i class="fa-regular fa-folder"></i>
            {:else if item.gubun == 'F'}
            <i class="fa-regular fa-file"></i>
            {/if}
          </div>
          <div class="item-name">{item.name}</div>
          {#if item.gubun == 'F'}
          <div class="item-size">{humanFileSize(item.size)}</div>
          {/if}
        </div>
      {/each}
    {/if}
  </div> 
</section>

<style>
  .row-item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .item-volumn-name {
    width: 100px;
  }
  .item-gubun {
    width: 30px;
  }
  .item-size {
    width: 100px;
    align-items: flex-end;
    margin-left: 10px;
  }
</style>