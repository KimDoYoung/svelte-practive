<!-- 파일명 : MovieReviewEdit.svelte -->
<script lang="ts">
  // import Quill from 'quill';
  // import Link from 'quill/formats/link';
  // import "quill/dist/quill.core.css";
  import 'quill/dist/quill.snow.css';
	import type { MovieReviewItem } from '$lib/types';
	import { onMount } from 'svelte';
  
  type MovieReviewEditType = {
    mode: string;
    review: MovieReviewItem;
    handleGoListButton: () => void;
  }
  let {review, mode, handleGoListButton} :MovieReviewEditType  = $props();
  let quill;
  let editor: any;

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const Quill = (await import('quill')).default;
      editor = new Quill('#editor-container', {
        theme: 'snow',
      });
      // DOM에서 role="button" 제거
      const buttons = document.querySelectorAll('.ql-picker-label[role="button"]');
      buttons.forEach((button) => {
        button.removeAttribute('role');
      });      
    }
  });
</script>
<!-- html -->
<div  class="quill-container">
  <div id="editor-container">
    <p>Hello World!</p>
    <p>Some initial <strong>bold</strong> text</p>
    <p><br /></p>
  </div>
</div>
<style>

</style>