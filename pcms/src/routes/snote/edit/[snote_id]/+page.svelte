<!-- 파일명 : +page.svelte -->
<script lang="ts">
  import { SnoteCrypto } from '$lib/utils/snote_crypto';
	import { onMount } from 'svelte';
  import {postFetch} from '$lib/api';
	import Alert from '$lib/components/common/Alert.svelte';

  let alertRef: Alert | null = null;
  let {data} = $props();
//  let message = $state('');
  let plain_text = $state('')
  const doEncrypt = () => {
    let pwElm = document.getElementById('password');
    let pw = (pwElm as HTMLInputElement).value;
    if(pw.length == 0) {
      alert('패스워드를 입력해주세요');
      return;
    }
    let passwordHash = SnoteCrypto.passwordHash(pw);
    if (passwordHash !== data.hashPassword){
      alertRef?.showAlert("패스워드가 일치하지 않습니다.", "warning", 1500);
      return;
    }
    plain_text = SnoteCrypto.decryptNote(data.encryptedText, pw);   
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      doEncrypt();
    }
  }
  const copyClipboard = () => {
    const noteElm = document.getElementById('encrypted_note') as HTMLTextAreaElement;

    if (noteElm) {
      const text = noteElm.value; // textarea의 내용을 가져옴
      navigator.clipboard.writeText(text) // Clipboard API 사용
        .then(() => {
          alertRef?.showAlert("클립보드에 복사되었습니다.", "success", 1500);
        })
        .catch(err => {
          console.error('클립보드 복사 실패:', err);
          alertRef?.showAlert("클립보드에 복사되었습니다.", "error", 1500);
        });
    } else {
      alert('복사할 내용이 없습니다.');
    }
  };
  const updateSnote = async() =>{
    let titleElm = document.getElementById('title');
    let title: string = titleElm ? (titleElm as HTMLInputElement).value : '';
    let pwElm = document.getElementById('password');
    let pw: string = pwElm ? (pwElm as HTMLInputElement).value : '';
    let noteElm = document.getElementById('encrypted_note');
    let note: string = noteElm ? (noteElm as HTMLTextAreaElement).value : '';
    let hintElm = document.getElementById('hint');
    let hint: string = hintElm ? (hintElm as HTMLInputElement).value : '';
    debugger;
    let encrypted_note = await SnoteCrypto.encrypt(note, pw, hint)
    console.log('암호화된 노트 : ' + encrypted_note)
    postFetch('/snote', {id: data.id, title : title, note: encrypted_note}).then(()=>{
      alertRef?.showAlert("저장되었습니다.", "success", 1500);
    }).catch((err) => {
      alertRef?.showAlert("저장에 실패했습니다.", "error", 1500);
    });
  }
  const goSnoteList = () => {
    window.location.href = '/snote';
  }
  onMount(() => {
    let pwElm = document.getElementById('password');
    (pwElm as HTMLInputElement).focus();
  });
</script>
<fieldset>
  <legend>제목</legend>
  <input type="text" id="title" value={data.title} />
</fieldset>
<div class="grid">
  <fieldset>
    <legend>힌트</legend>
    <input type="text" id="hint" value={data.hint} />
  </fieldset>
  <fieldset>
    <legend>패스워드</legend>
    <input type="password" id="password"  onkeydown={handleKeydown} />
  </fieldset>
  <fieldset>
    <legend>복원</legend>
    <button onclick={doEncrypt}>복원</button>
  </fieldset>
</div>
<div class="note-area">
  <textarea name="encrypted_note" id="encrypted_note" style="height:250px">{plain_text}</textarea>
</div>
<div class="button-area">
  <button onclick={updateSnote}>저장</button>
  <button class="secondary" onclick={copyClipboard}>클립보드로 복사</button>
  <button class="contrast" onclick={goSnoteList}>리스트로 이동</button>
</div>
<Alert bind:this={alertRef}/>
<style>
  .button-area {
    text-align: center;
    margin-bottom: 10px;
  }
  .note-area {
    margin-top: 10px;
  }
</style>