<script lang="ts">
  import { postFetch } from '$lib/api'; 
  import Alert from '$lib/components/common/Alert.svelte'; 
  import { onMount } from 'svelte';
  let {data} = $props();
  onMount(() => {
    console.log(data);
  });
  const handleUpsert = () => {
    console.log(data);
    let param = {
      id: data.id,
      ymd: data.ymd.replace(/-/g, ''),
      item: data.item,
      location: data.location,
      cost: data.cost,
      lvl: data.lvl,
      spec: data.spec
    }
    debugger;
    console.log("param:", param); 
    const url = `/jangbi`;
    postFetch(url, param).then((res) => {
      console.log(res);
      alertRef?.showAlert("저장되었습니다.", "info", 3000);
    }).catch((err) => {
      console.log(err);
      alertRef?.showAlert("저장에 실패하였습니다.", "error", 3000);
    });
  }
  const handleCancel = () => {
    window.location.href = "/jangbi";
  } 
  let alertRef: Alert | null = null;
</script>
<form id="jangbi-form">
  <fieldset>
    <div class="grid">
      <div>
        <label for="ymd">구입일자</label>
        <input type="date" id="ymd" name="ymd" bind:value={data.ymd} />
        <input type="hidden" id="id" name="id" bind:value={data.id}/>
      </div>
      <div>
        <label for="item">품목</label>
        <input type="text" id="item" name="item" bind:value={data.item} />
      </div>
      <div>
        <label for="location">위치</label>
        <input type="text" id="location" name="location" bind:value={data.location} />
      </div>
      <div>
        <label for="cost">가격</label>
        <input type="number" id="cost" name="cost" bind:value={data.cost} />
      </div>
      <div>
        <label for="lvl">만족도</label>
        <select id="lvl" name="lvl" bind:value={data.lvl}>
          <option value=""></option>
          <option value="3">😃 만족</option>
          <option value="2">🙁 보통</option>
          <option value="1">😡 실망</option>
        </select>
      </div>
    </div>
    <label for="spec">스펙</label>
    <textarea id="spec" name="spec" style="height:300px" bind:value={data.spec} ></textarea>
  </fieldset>
  <div class="button-area">
    <input type="button" value="저장" onclick={handleUpsert}/>
    <input type="button" class="secondary" value="취소" onclick={handleCancel}/>
  </div>
</form>
<Alert bind:this={alertRef}/>
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
