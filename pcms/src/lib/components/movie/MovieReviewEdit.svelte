<!-- 파일명 : MovieReviewEdit.svelte -->
<!-- TODO : 파일업로드 -->
<script lang="ts">
  import "quill/dist/quill.core.css";
  import 'quill/dist/quill.snow.css';
	import type { MovieReviewItem } from '$lib/types';
	import { onMount } from 'svelte';
  import Alert from "../common/Alert.svelte";
	
  
  type MovieReviewEditType = {
    review: MovieReviewItem;
    mode: string;
    // review: MovieReviewItem;
    handleGoListButton: () => void;
    handleInsertButton: (review: MovieReviewItem ) => void;
    handleViewButton: (id:number) => void;
  }
  let {review, mode, handleGoListButton, handleInsertButton,handleViewButton } :MovieReviewEditType  = $props();
 
  let editor: any = null;

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const Quill = (await import('quill')).default;
      const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'], //Bold, tilt, underline, strikethrough
            ['image','link'],  //upload picture
            ['clean'], //Clear format
            [{'header': 1}, {'header': 2}], //Title H1 H2
            [{'list': 'ordered'}, {'list': 'bullet'}],  //Datasheets
            [{'indent': '-1'}, {'indent': '+1'}],   // Indent, reduce indent
            ['blockquote', 'code-block']
            // ['video'], //Video upload
            // ['formula'] // Need to load cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js
        ];
      const options = {
        modules: {
          toolbar: toolbarOptions,
        },
        //placeholder: '내용을 입력하세요...',
        theme: 'snow'
      };           
      if (editor === null){
        editor = new Quill('#content', options);
      }
      // DOM에서 role="button" 제거
      const buttons = document.querySelectorAll('.ql-picker-label[role="button"]');
      buttons.forEach((button) => {
        button.removeAttribute('role');
      });      
    }
  });
  const saveButtonClick = () => {

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
    alertRef?.showAlert("저장되었습니다.", "info", 1500)
  }

  $effect( () => {
  });
  let alertRef: Alert | null = null;
</script>
<!-- html -->
  <div>
      <label for="title">제목</label>
      <input type="text" id="title" name="title" bind:value={review.title} />
      <div class="horizontal">
        <div>
          <label for="ymd">감상일자</label>
          <input type="text" id="ymd" name="ymd" bind:value={review.ymd}/>
        </div>
        <div>
          <label for="lvl">평가</label>
          <input type="number" id="lvl" name="lvl"  min="1" max="5" bind:value={review.lvl}/>
        </div>
        <div>
          <label for="nara">나라</label>
          <input type="text" id="nara" name="nara" bind:value={review.nara} >
        </div>
        <div>
          <label for="year">제작년도</label>
          <input type="text" id="year" name="year" bind:value={review.year} >
        </div>
      </div>
      <div id="content" class="content">{@html review.content}</div>
  </div>

  <div class="button-area">
    <button onclick={saveButtonClick}>저장</button>
    <button class="" onclick={()=>handleViewButton(review.id)}>보기</button>
    <button class="secondary" onclick={handleGoListButton}>목록으로</button>
  </div>  
  <Alert bind:this={alertRef}/> 
<style>
.horizontal {
  display: flex;
  flex-direction: row;
  justify-items: space-between;
  gap: 10px;
}
#content {
  height: 300px;
}
.button-area {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}
</style>