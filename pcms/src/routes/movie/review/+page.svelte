<!-- 파일명 : +page.svelte -->
<!--
  파일명 : /review/+page.svelte
  영화감상평 검색
-->
<script lang="ts">
  import SearchInput from "$lib/components/common/SearchInput.svelte";
	import type { MovieReviewListResponse } from "$lib/types";
  let data: MovieReviewListResponse;

  const searchInputClick = (keyword: string) => {
    console.log(keyword);
  }
  $effect(() => {
    console.log("영화감상평....");
    return () => {
      console.log("영화감상평.... cleanup");
    };
  });
</script>
<section>
  <SearchInput {searchInputClick} placeholder_text="DVD 찾고자하는 키워드"/>
</section>
<style>
</style>