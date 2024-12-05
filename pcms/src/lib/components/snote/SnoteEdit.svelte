<!-- 
  파일명 : SnoteEdit.svelte 
  기능 : Snote 편집 컴포넌트
-->
<script lang="ts">

import type { SnoteCreate } from '$lib/types'

type SnoteEditType = {
  upsertButtonClicked: (snote: SnoteCreate) => void,
}
let {upsertButtonClicked} : SnoteEditType = $props()
let snote: SnoteCreate = $state({
  title: '',
  hint: '',
  note: '',
  password: ''
});

$effect(() => {
  console.log('SnoteEdit 컴포넌트가 마운트 되었습니다.')
  return () => {
    console.log('SnoteEdit 컴포넌트가 언마운트 되었습니다.')
  }
})  
</script>
<!-- html -->
<section>
  <form id="snote-form">
    <input type="text" name="title" id="title" placeholder="제목을 넣어주세요" bind:value={snote.title}>
    <textarea id="content" name="content" placeholder="암호화할 텍스트를 넣어주세요" bind:value={snote.note}></textarea>
    <div class="grid">
      <div>
        <label for="hint">Hint</label>
        <input type="text" name="hint" id="hint" placeholder="패스워드 힌트를 넣어주세요" bind:value={snote.hint}>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" name="password" id="password" placeholder="패스워드" bind:value={snote.password}>
      </div>
    </div>
  <button onclick={()=>{upsertButtonClicked(snote)}}>저장</button>
  </form>
</section>

<style> 
form textarea {
  width: 100%;
  height: 300px;
} 
</style>