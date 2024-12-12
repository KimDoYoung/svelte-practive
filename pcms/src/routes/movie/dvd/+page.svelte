<!-- 파일명 : +page.svelte -->
<script lang="ts">
	import SearchInput from "$lib/components/common/SearchInput.svelte";
  const searchInputClick = (keyword: string) => {
    console.log(keyword);
  }
</script>

<main class="container">
  <h3>영화-dvd</h3>
  <SearchInput {searchInputClick} placeholder_text="찾고자하는 키워드"/>
</main>

<style>
</style>
