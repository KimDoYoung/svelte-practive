<!-- 파일명 : JangbiEdit.svelte.svelte -->
<script lang="ts">
import { DateYmdUtil } from '$lib/utils/date_ymd_util';
import { displayMoney, displayContent } from '$lib/utils/commonUtils';
import type { JangbiDetailResponse, JangbiRequest } from '$lib/types/jangbi';

type JangbiEditProps = {
  mode : string;
  jangbi : JangbiDetailResponse;
  handleSave : (jangbi: JangbiDetailResponse) => void;
  handleCancel : () => void;
};
let {mode, jangbi, handleSave, handleCancel} : JangbiEditProps = $props();
// let anotherJangbi = $derived(jangbi);
let anotherJangbi: JangbiRequest = {
  id: 0,
  ymd: '',
  item: '',
  location: '',
  cost: 0,
  lvl: '',
  spec: ''
}
const clickSaveButton = () => {
  let id  = (document.getElementById('id') as HTMLInputElement).value;
  let form = document.getElementById('jangbi-form') as HTMLFormElement;
  anotherJangbi.id= Number(id);
  debugger;
  anotherJangbi.ymd =  (document.getElementById('ymd') as HTMLInputElement).value.replace(/-/g, '');
  anotherJangbi.item = (document.getElementById('item') as HTMLInputElement).value;
  anotherJangbi.location = (document.getElementById('location') as HTMLInputElement).value;
  anotherJangbi.cost = Number((document.getElementById('cost') as HTMLInputElement).value);
  anotherJangbi.lvl = (document.getElementById('lvl') as HTMLSelectElement).value;
  anotherJangbi.spec = (document.getElementById('spec') as HTMLTextAreaElement).value;
  debugger;
  console.log("anotherJangbi:" + anotherJangbi);
  if (anotherJangbi.ymd == '' || 
      anotherJangbi.item == '' || 
      anotherJangbi.location == '' || 
      anotherJangbi.cost == 0 || 
      anotherJangbi.spec == '' || 
      anotherJangbi.lvl == '') {
    alert('입력값을 확인하세요');
    return;
  }
  //validation check
  let res : JangbiDetailResponse = {
    id: anotherJangbi.id,
    ymd: anotherJangbi.ymd,
    item: anotherJangbi.item,
    location: anotherJangbi.location,
    cost: anotherJangbi.cost,
    lvl: anotherJangbi.lvl,
    spec: anotherJangbi.spec,
    attachments: []
  }
  handleSave(res);
}
</script>

<form id="jangbi-form">
  <fieldset>
    <div class="grid">
      <div>
        <label for="ymd">구입일자</label>
        <input type="date" id="ymd" name="ymd" bind:value={anotherJangbi.ymd} />
        <input type="hidden" id="id" name="id" bind:value={anotherJangbi.id}/>
      </div>
      <div>
        <label for="item">품목</label>
        <input type="text" id="item" name="item" bind:value={anotherJangbi.item} />
      </div>
      <div>
        <label for="location">위치</label>
        <input type="text" id="location" name="location" bind:value={anotherJangbi.location} />
      </div>
      <div>
        <label for="cost">가격</label>
        <input type="number" id="cost" name="cost" bind:value={anotherJangbi.cost} />
      </div>
      <div>
        <label for="lvl">만족도</label>
        <select id="lvl" name="lvl" bind:value={anotherJangbi.lvl}>
          <option value=""></option>
          <option value="3">😃 만족</option>
          <option value="2">🙁 보통</option>
          <option value="1">😡 실망</option>
        </select>
      </div>
    </div>
    <label for="spec">스펙</label>
    <textarea id="spec" name="spec" style="height:400px" bind:value={anotherJangbi.spec} ></textarea>
  </fieldset>
  <div class="button-area">
    <input type="button" value="저장" onclick={clickSaveButton}/>
    <input type="button" class="secondary" value="취소" onclick={handleCancel}/>
  </div>
</form>
<style>
  .button-area {
    display: flex;
    justify-content: flex-start;
    gap: 1rem; /* 버튼 사이의 간격 */
    margin-top: 20px;
  }

  .button-area input[type="button"] {
    padding: 0.5rem 1rem;
    cursor: pointer;
    width: 120px; /* 버튼 너비 설정 */
  }

  .button-area input.secondary {
    background-color: #b5a5a5;
    border: 1px solid #ccc;
  }
</style>
