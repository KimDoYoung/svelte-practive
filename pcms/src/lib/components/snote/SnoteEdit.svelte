<!-- 
  파일명 : SnoteEdit.svelte 
  기능 : Snote 편집 컴포넌트
-->
<script lang="ts">
	import {  postFetch } from '$lib/api';
  import type { SnoteCreate } from '$lib/types'
  import {SnoteCrypto} from '$lib/utils/snote_crypto'

  type SnoteEditType = {
    upsertButtonClicked: (snote: SnoteCreate) => void,
    cancelButtonClicked: () => void
  }
  let {upsertButtonClicked, cancelButtonClicked} : SnoteEditType = $props()
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

  //검증후 암호화하고 저장, 부모에게 알림
  const  validate_and_event_fire = async () => {
    let title: string = '';
    let encrypted_note: string = '';

    if (!snote.title) {
      snote.title = '제목없음 '+ new Date().toLocaleString()
    }
    title = snote.title
    if (!snote.note) {
      alert('내용을 입력해주세요')
      return
    }
    encrypted_note = await SnoteCrypto.encrypt(snote.note, snote.password, snote.hint)
    console.log('암호화된 노트 : ' + encrypted_note)
    postFetch('/snote', { title : title, note: encrypted_note}).then(()=>{
      upsertButtonClicked(snote);
    });
  }
  // TODO: api에서 암호화하지 말고 그냥 평문 패스워드를 보내야한다.
  // TODO: crypto에 decrypt함수를 만들어서 사용해야한다.
  // TODO: 새로운 것은 id를 -1로 하자. props로 받을 수 있는가? SnoteCreate 받아서 decrypt를 해야한다. 

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
        <input type="password" name="password" id="password" placeholder="패스워드" bind:value={snote.password}>
      </div>
    </div>
  <button onclick={()=>{validate_and_event_fire()}}>저장</button>
  <button class="secondary" onclick={()=>{cancelButtonClicked()}}>취소</button>
  </form>
</section>

<style> 
form textarea {
  width: 100%;
  height: 300px;
} 
</style>