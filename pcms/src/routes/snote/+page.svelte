<!-- 파일명 : \src\routes\snote/+page.svelte -->
<script lang="ts">
  import SnoteEdit from "$lib/components/snote/SnoteEdit.svelte";
	import type { SnoteCreate } from "$lib/types/snote";

  const upsertButtonClicked = (snote: SnoteCreate) => {
    console.log('저장 버튼 클릭' + JSON.stringify(snote, null, 2));
  }
</script>
  <main class="container">
      <h1>Snote</h1>
      <SnoteEdit {upsertButtonClicked} />
  </main>
<style>
</style>