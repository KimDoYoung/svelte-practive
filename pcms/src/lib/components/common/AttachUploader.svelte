<!-- 파일명 : /lib/components/common/AttachUploader.svelte -->
<script lang="ts">
  import { postFetchMulti}   from '$lib/api';
  import type { Attachment, Ymd } from '$lib/types';
  import { displayYmd } from '$lib/utils';
  import { ModalManager } from './ModalManager.svelte';

  const urlMap = new Map<string, string>([
    ['日志', '/diary/attachments'],
    ['일기', '/diary/attachments'],
    ['장비', '/equipment'],
  ]);

  let { target = '日志', ymd='', modalId='' } = $props();
  let ymdHuman = $derived(displayYmd(ymd,true))


  const upload = async () => {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('파일을 선택해주세요!');
        return;
    }    
    const files = Array.from(fileInput.files);
    const data = {
        files, // 여러 파일 배열 추가
    };
    let url = urlMap.get(target) + '/' + ymd || 'attach';
    console.log('url:', url);
    try {
        const response = await postFetchMulti<Attachment[]>(
            url, // 서버의 업로드 API 엔드포인트
            data
        );
        console.log('업로드 성공:', response);
        alert('업로드 성공!');
        fileInput.value = ''; // 파일 선택창 초기화
    } catch (error) {
        alert('업로드 중 오류 발생:' + error);
        console.error('업로드 중 오류 발생:', error);
    }
  }
  let modalManager = new ModalManager();
  const toggleModal = (event: Event) => {
    modalManager.toggleModal(event);
  };
</script>
<dialog id="{modalId}">
<article>
  <header>
    <a href="#none" aria-label="Close"  rel="prev" data-target="{modalId}" onclick={(event) => toggleModal(event)}></a>
    <h3>첨부파일 업로더 {target} : {ymdHuman}</h3>  
  </header>
  <p>
    파일을 선택해주세요.
    <input type="file" id="file" name="file" accept="image/*" multiple>
  </p>
  <footer>
    <button class="secondary" data-target="{modalId}" onclick={(event) => toggleModal(event)}>Cancel</button>   
    <button onclick="{upload}">Upload</button>
  </footer>
</article>
</dialog>

<style>
</style>