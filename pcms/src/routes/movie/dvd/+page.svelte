<!-- 파일명 : +page.svelte -->
<!--
TODO: update기능 필요 
-->
<script lang="ts">
	import { getFetch } from "$lib/api";
	import SearchInput from "$lib/components/common/SearchInput.svelte";
  import MovieDvdList from "$lib/components/movie/MovieDvdList.svelte";
  import type { MovieDvdListResponse } from "$lib/types";

  let {data} = $props();
  let mode = $state('list');

  let search_text = "";
  let pageNo = 1;
  //검색버튼 클릭시
  const searchInputClick = (keyword: string) => {
    search_text = keyword;
    console.log(1,keyword);
    pageNo = 1;
    loadDvdPage();
  }
  // 1페이지 가져오기
  const loadDvdPage = () => {
    let params = {
      search_text: search_text,
      start_index: (pageNo - 1) * 10 ,
      limit: 10,
    }
    getFetch<MovieDvdListResponse>('/movies',params).then((res) => {
      data = res;
    });
    console.log("loadDvdPage");
  }
  const handleSelectedRow = (id: number) => {
    console.log("handleSelectedRow",id);
  }

</script>
<section class="list-section" class:visible={mode === 'list'} class:invisible={mode !== 'list'}>
  <div>
    <SearchInput {searchInputClick} placeholder_text="찾고자하는 키워드"/>
  </div>
  <div class="list-area">
  {#if data.item_count === 0}
    <p>검색 결과가 없습니다.</p>
  {:else}
    <MovieDvdList {data} {handleSelectedRow}/>
  {/if}
  </div>

  <div class="button-area">
    {#if data.start_index > 0}
      <button onclick={()=>{pageNo--;loadDvdPage()}}>이전</button>
    {/if}
    {#if data.next_data_exists}
      <button onclick={()=>{pageNo++;loadDvdPage()}}>다음</button>
    {/if}
  </div>
</section>
<style>
</style>
