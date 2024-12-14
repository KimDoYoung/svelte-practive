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
  let html = $derived(review.content);


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
  // $: if (editor && review.content) {
  //   editor.setContents(editor.clipboard.convert(review.content));
  // }  
  $effect( () => {
    // let initialContent = editor.clipboard.convert(html)
    // editor.setContents(initialContent, 'silent')     
    // if(editor && review.content){
    //     // editor.setContents(review.content);
    //     let initialContent = editor.clipboard.convert(review.content)
    //     editor.setContents(initialContent, 'silent')        
    //     // editor.setContents(editor.clipboard.convert(review.content));
    // }
  });
</script>
<!-- html -->
  <div class="edit-title"><h3>{review.title}</h3></div>
  <div id="editor-container">{@html html}</div>
  <div class="button-area">
    <button onclick={handleGoListButton}>목록</button>
  </div>  
<style>

</style>