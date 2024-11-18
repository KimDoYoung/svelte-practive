<!-- 파일명 : /lib/components/common/AttachUploader.svelte -->
<script lang="ts">
  import { postFetchMulti}   from '$lib/api';
  import type { Attachment, Ymd } from '$lib/types';
  import { displayYmd } from '$lib/utils';
  let { target = '日志', ymd='' } = $props();
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
    let url = target == '日志' ? `/diary/attachments/${ymd}` : 'attach';
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
</script>
<h2>첨부파일 업로더 {target} : {ymdHuman}</h2>
<input type="file" id="file" name="file" accept="image/*" multiple>
<button onclick="{upload}">Upload</button>
<style>
</style>