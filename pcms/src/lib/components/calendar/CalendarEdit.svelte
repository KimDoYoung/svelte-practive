<!-- 파일명 : CalendarEdit.svelte -->
<script lang="ts">
  import { postFetch } from "$lib/api";
  import { DateYmdUtil } from "$lib/utils"
  import type { CalendarResponse } from "$lib/types";

  type CalendarEditType = {
    editChangeNotice: (ymd: string) => void,
    editCancelNotice: () => void
  }
  let {editChangeNotice, editCancelNotice} : CalendarEditType = $props()
  const saveButtonClick = (e:Event) => {
    e.preventDefault();
    const section = document.querySelector(".calendar-form-area"); // section 선택
    const gubun = (section?.querySelector('input[name="gubun"]:checked') as HTMLInputElement)?.value;
    const sorl = (section?.querySelector('input[name="sorl"]:checked') as HTMLInputElement)?.value;
    const ymd = (section?.querySelector('.calendar-form-area input[name="ymd"]') as HTMLInputElement)?.value;
    const content = (section?.querySelector('input[name="content"]') as HTMLInputElement)?.value;

    if (ymd && content) {
      if (!DateYmdUtil.isValidYmd(ymd)) {
        alert("날짜 형식이 잘못되었습니다.");
        return;
      } 
      const data = {gubun, ymd, content, sorl}
      postFetch<CalendarResponse>("/api/v1/calendar", data).then((res: CalendarResponse) => {
        editChangeNotice(res.ymd);
      });
    }
  }
</script>
<!-- html -->
<section class="calendar-form-area">
    <div class="grid">
      <input type="radio" name="gubun" id="gubun1" value="H">
      <label for="gubun1">이벤트</label>
      <input type="radio" name="gubun" id="gubun2" value="E" checked>
      <label for="gubun2">휴일</label>
      <input type="radio" name="gubun" id="gubun3" value="Y">
      <label for="gubun3">매년</label>
      <input type="radio" name="gubun" id="gubun4" value="M">
      <label for="gubun4">매달</label>
    </div>  
    <div class="grid">
      <input type="radio" name="sorl" id="sorl1" value="S" checked>
      <label for="sorl1">양력</label>
      <input type="radio" name="sorl" id="sorl2" value="L">
      <label for="sorl2">음력</label>
    </div>
    <div class="grid">
      <label for="ymd">날짜</label>
      <input type="text" name="ymd" id="ymd" required>
      <label for="content">내용</label>
      <input type="text" name="content" id="content" required>
    </div>
    <div class="grid">
      <button onclick={(e)=>{saveButtonClick(e)}}>저장</button>
      <button class="secondary" onclick={editCancelNotice}>취소</button>
    </div>
</section>

<style>
  .calendar-form-area {
    width: 80%;
    background-color: antiquewhite;
    border-radius: 10px;
    padding: 10px;
  }
</style>