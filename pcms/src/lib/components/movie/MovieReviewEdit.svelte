<!-- 파일명 : MovieReviewEdit.svelte -->
<script lang="ts">

  import Editor from '@toast-ui/editor';
  import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
  import '@toast-ui/editor/dist/toastui-editor-viewer.css'; // Editor's Viewer's Style
	import type { MovieReviewItem } from '$lib/types';
  
  type MovieReviewEditType = {
    mode: string;
    review: MovieReviewItem;
    handleGoListButton: () => void;
  }
  let {review, mode, handleGoListButton} :MovieReviewEditType  = $props();
  let editor: Editor;

  $effect(() => {
    editor = new Editor({
      el: document.querySelector('#content'),
      height: '600px',
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      usageStatistics: false
    });
  });
</script>
<!-- html -->
<div id="content"></div>
<style>
</style>