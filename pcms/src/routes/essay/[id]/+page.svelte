<script lang="ts">
  import "quill/dist/quill.core.css";
  import 'quill/dist/quill.snow.css';  
  import { onMount } from 'svelte';
  import type { EssayBase } from '$lib/types/essay';
	import { postFetch } from "$lib/api";
  import Alert from '$lib/components/common/Alert.svelte';
  //TODO : 이미지 업로드하면 이미지 경로를 저장하도록 수정, 붙여넣기는 Code64로, 이미지버튼 파일선택하면 이미지를 upload하고 url만을
  let {data} = $props();
  let editor: any;
  onMount(async () => {
    if (typeof window !== 'undefined') {
      const Quill = (await import('quill')).default;
      // const toolbarOptions = [
      //   ['bold', 'italic', 'underline', 'strike'],
      //   [{ 'header': 1 }, { 'header': 2 }],
      //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],

      //   ['image', 'link'],

      // ];     
      var toolbarOptions = [
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
      editor = new Quill('#content', options);
      editor.keyboard.addBinding({
          key: 's',
          ctrlKey: true
        }, function() {
          saveButtonClick();
        });

      // DOM에서 role="button" 제거
      const buttons = document.querySelectorAll('.ql-picker-label[role="button"]');
      buttons.forEach((button) => {
        button.removeAttribute('role');
      });      
    }
  });
  //저장버튼
  const saveButtonClick = () => {
    const titleElm = document.getElementById('title') as HTMLInputElement;
    const content = editor.root.innerHTML;
    console.log(content);
    let essay = {} as EssayBase;
    essay.title = titleElm.value;
    essay.content = content;
    if (essay.title.length === 0) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content.length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }

    console.log(essay);
    let params = {
      id : data.id,
      title: essay.title,
      content: essay.content
    }
    postFetch('/essay/upsert', params).then((res) => {
      console.log(res);
      data.id = (res as EssayBase).id;
      alertRef?.showAlert("저장되었습니다.", "info", 1500);
    }).catch((err) => {
      console.log(err);
      alertRef?.showAlert("에러가 발생했습니다.", "error", 1500);
    });
  }
  const goListButtonClick = () => {
    console.log('목록으로');
    window.location.href = '/essay';
  }
  let alertRef: Alert | null = null;
</script>
  <label for="title">제목</label>
  <input type="text" id="title" name="title" value="{data.title}" />
  <label for="content">내용</label>
  <div id="content" class="content">{@html data.content}</div>
  <div class="button-area">
    <button onclick={saveButtonClick}>저장</button>
    <button class="secondary" onclick={goListButtonClick}>목록으로</button>
  </div> 
  <Alert bind:this={alertRef}/>     
<style>
  .content {
    margin-top: 10px;
    background-color: #f6f6d7;
    padding: 10px;
    font-size: medium;
    height: 400px;
  }
  .button-area {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 10px;
  }  
</style>