<!-- 파일명 : MovieReviewEdit.svelte -->
<script lang="ts">
  import Quill from 'quill';
  import Link from 'quill/formats/link';
  import "quill/dist/quill.core.css";
  import 'quill/dist/quill.snow.css';
	import type { MovieReviewItem } from '$lib/types';
	import { onMount } from 'svelte';
	import { todayYmd } from '$lib/utils';
	
  
  type MovieReviewEditType = {
    mode: string;
    // review: MovieReviewItem;
    handleGoListButton: () => void;
    handleInsertButton: (review: MovieReviewItem ) => void;
  }
  let {mode, handleGoListButton, handleInsertButton } :MovieReviewEditType  = $props();
  let quill;
  let editor: any;
  // let html = $derived(review.content);


  onMount(async () => {
    if (typeof window !== 'undefined') {
      const Quill = (await import('quill')).default;
      const options = {
        modules: {
          toolbar: true,
        },
        placeholder: '감상평 입력...',
        theme: 'snow'
      };      
      editor = new Quill('#editor-container', options);
      // DOM에서 role="button" 제거
      const buttons = document.querySelectorAll('.ql-picker-label[role="button"]');
      buttons.forEach((button) => {
        button.removeAttribute('role');
      });      
    }
  });
  const saveButtonClick = () => {
    const titleElm = document.getElementById('title') as HTMLInputElement;
    const ymdElm = document.getElementById('ymd') as HTMLInputElement;
    const lvlElm = document.getElementById('lvl') as HTMLInputElement;
    const naraElm = document.getElementById('nara') as HTMLInputElement;
    const yearElm = document.getElementById('year') as HTMLInputElement;
    let review = {} as MovieReviewItem;
    review.title = titleElm.value;
    review.ymd = ymdElm.value;
    review.lvl = Number(lvlElm.value);
    review.nara = naraElm.value;
    review.year = yearElm.value;
    if (review.title.length === 0) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (review.ymd.length === 0) {
      alert('감상일자를 입력해주세요.');
      return;
    }
    if (review.lvl === 0) {
      alert('평가를 입력해주세요.');
      return;
    }
    if (review.nara.length === 0) {
      alert('나라를 입력해주세요.');
      return;
    }
    if (review.year.length === 0) {
      alert('제작년도를 입력해주세요.');
      return;
    }

    review.content = editor.root.innerHTML;
    // console.log(review);
    handleInsertButton(review);
  }

  $effect( () => {
  });
</script>
<!-- html -->
  <div>
      <label for="title">제목</label>
      <input type="text" id="title" name="title" />
      <div class="horizontal">
        <div>
          <label for="ymd">감상일자</label>
          <input type="text" id="ymd" name="ymd" value={todayYmd()}/>
        </div>
        <div>
          <label for="lvl">평가</label>
          <input type="number" id="lvl" name="lvl"  min="1" max="5" value="2">
        </div>
        <div>
          <label for="nara">나라</label>
          <input type="text" id="nara" name="nara" >
        </div>
        <div>
          <label for="year">제작년도</label>
          <input type="text" id="year" name="year">
        </div>
      </div>
  </div>

  <div id="editor-container"></div>
  <div class="button-area">
    <button onclick={saveButtonClick}>저장</button>
    <button class="secondary" onclick={handleGoListButton}>목록</button>
  </div>  
<style>
.horizontal {
  display: flex;
  flex-direction: row;
  justify-items: space-between;
  gap: 10px;
}
#editor-container {
  height: 300px;
}
.button-area {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}
</style>