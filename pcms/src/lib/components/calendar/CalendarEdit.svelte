<!-- 파일명 : CalendarEdit.svelte -->
<script lang="ts">
</script>
<!-- html -->
 <section class="calendar-form-area">
  <form action="">
    <div class="grid">
      <label for="gubun1">이벤트</label>
        <input type="radio" name="gubun" id="gubun1" value="E">
      <label for="gubun2">매년</label>
        <input type="radio" name="gubun" id="gubun2" value="Y">
      <label for="gubun3">매달</label>
        <input type="radio" name="gubun" id="gubun3" value="M">
    </div>  
    <label for="name">이름</label>
    <input type="text" name="name" id="name">
  </form>
 </section>

<style>
  .calendar-form-area {
    width: 50%;
  }
</style>