<!-- 파일명 : +page.svelte -->
<script lang="ts">
  import { SnoteCrypto } from '$lib/utils/snote_crypto';
  let {data} = $props();
  let message = $state('');
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
      message = '패스워드가 일치하지 않습니다.';
      return;
    }
    plain_text = SnoteCrypto.decryptNote(data.encryptedText, pw);
    message ='';
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      doEncrypt();
    }
  }
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
    <input type="password" id="password"  onkeydown={handleKeydown}/>
  </fieldset>
</div>
<div class="button-area">
  <button onclick={doEncrypt}>해독</button>
</div>
{#if message}
<div>{message}</div>
{/if}
<div class="note-area">
  <textarea name="encrypted_note" id="encrypted_note" style="height:300px">{plain_text}</textarea>
</div>

<style>
  .button-area {
    text-align: center;
    margin-bottom: 10px;
  }
  .note-area {
    margin-top: 10px;
  }
</style>