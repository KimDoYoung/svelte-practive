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
  let search_text = "";
  let pageNo = 1;
  const searchInputClick = (keyword: string) => {
    search_text = keyword;
    console.log(1,keyword);
    pageNo = 1;
    loadDvdPage();
  }
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
</script>

<section>
  <SearchInput {searchInputClick} placeholder_text="찾고자하는 키워드"/>
</section>
<section class="list-area">
{#if data.item_count === 0}
  <p>검색 결과가 없습니다.</p>
{:else}
  <MovieDvdList {data}/>
{/if}
</section>

<section class="button-area">
  {#if data.start_index > 0}
    <button onclick={()=>{pageNo--;loadDvdPage()}}>이전</button>
  {/if}
  {#if data.next_data_exists}
    <button onclick={()=>{pageNo++;loadDvdPage()}}>다음</button>
  {/if}
</section>

<style>
</style>
