<!-- 파일명 : EssayView.svelte.svelte -->
<script lang="ts">
  import type { EssayBase } from '$lib/types/essay';
  type EssayViewProps = {
    essay: EssayBase;
    backtoButtonClick : (id: number) => void;
  };
let {essay, backtoButtonClick} : EssayViewProps = $props();
</script>
<h1>{essay.title}</h1>
<p class="content-area">{@html essay.content}</p>
<button onclick={()=>{backtoButtonClick(essay.id)}}>목록으로</button>
<style>
  .content-area {
    white-space: pre-line;
    background-color: #f6f6d7;
    padding: 10px;
  }
</style>