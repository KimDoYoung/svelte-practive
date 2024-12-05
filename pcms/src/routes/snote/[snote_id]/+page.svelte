<!-- 파일명 : +page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  let snote_id = $page.params.snote_id;
</script>
  <main class="container">
    <h1>snote</h1>
    {snote_id}
  </main>
<style>
</style>