<!-- 파일명 : JangbiEdit.svelte.svelte -->
<script lang="ts">
import type { JangbiDetailResponse, JangbiRequest } from '$lib/types/jangbi';

type JangbiEditProps = {
  mode : string;
  jangbi : JangbiDetailResponse;
  handleSave : (jangbi: JangbiDetailResponse) => void;
  handleCancel : () => void;
};
let {mode, jangbi, handleSave, handleCancel} : JangbiEditProps = $props();

// Local state
let formData: JangbiRequest = {
  id: jangbi.id || 0,
  ymd: jangbi.ymd || '',
  item: jangbi.item || '',
  location: jangbi.location || '',
  cost: jangbi.cost || 0,
  lvl: jangbi.lvl || '',
  spec: jangbi.spec || '',
};
function handleKeydown(event: KeyboardEvent) {
    event.preventDefault(); // 브라우저의 기본 저장 동작 막기
    if (event.ctrlKey && event.key === 's') {
        save(); // 저장 함수 호출
    }
}
function save() {
    if (!formData.ymd || !formData.item || !formData.location || !formData.cost || !formData.lvl || !formData.spec) {
      alert('입력값을 확인하세요');
      return;
    }

    // Convert formData to JangbiDetailResponse
    const response: JangbiDetailResponse = {
      ...formData,
      attachments: jangbi.attachments || [],
    };

    handleSave(response);
  }

</script>
<form id="jangbi-form" >
  <fieldset>
    <div class="grid">
      <div>
        <label for="ymd">구입일자</label>
        <input type="date" id="ymd" name="ymd" bind:value={formData.ymd} />
        <input type="hidden" id="id" name="id" bind:value={formData.id}/>
      </div>
      <div>
        <label for="item">품목</label>
        <input type="text" id="item" name="item" bind:value={formData.item} />
      </div>
      <div>
        <label for="location">위치</label>
        <input type="text" id="location" name="location" bind:value={formData.location} />
      </div>
      <div>
        <label for="cost">가격</label>
        <input type="number" id="cost" name="cost" bind:value={formData.cost} />
      </div>
      <div>
        <label for="lvl">만족도</label>
        <select id="lvl" name="lvl" bind:value={formData.lvl}>
          <option value=""></option>
          <option value="3">😃 만족</option>
          <option value="2">🙁 보통</option>
          <option value="1">😡 실망</option>
        </select>
      </div>
    </div>
    <label for="spec">스펙</label>
    <textarea id="spec" name="spec" style="height:400px" bind:value={formData.spec} onkeydown={handleKeydown} ></textarea>
  </fieldset>
  <div class="button-area">
    <input type="button" value="저장" onclick={save}/>
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
