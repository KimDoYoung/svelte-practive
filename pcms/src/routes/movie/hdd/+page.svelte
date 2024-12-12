<!-- 파일명 : +page.svelte -->
<script lang="ts">
  import SearchInput from "$lib/components/common/SearchInput.svelte";
  const searchInputClick = (keyword: string) => {
    console.log(keyword);
  }
</script>
<section>
  <SearchInput {searchInputClick} placeholder_text="찾고자하는 키워드"/>
</section>
<style>
</style>