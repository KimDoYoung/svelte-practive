<!-- 파일명 : src\routes\calendar/+page.svelte -->
<script lang="ts">
	import CalendarEdit from '$lib/components/calendar/CalendarEdit.svelte';
  import  CalendarMonth  from '$lib/components/calendar/CalendarMonth.svelte';
  let year = $state(2024)
  let month = $state(12)

  let visibleForm = $state(false);


  const plus = () => {
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  const minus = () => {
    month -= 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }
  }

  let holidays = $state( [
    { name: "개천절", ymd: "20241206" },
    { name: "설날", ymd: "20241201" },
  ]);

  let eventDays = $state( [
    {
      company: "노브랜드",
      name: "상장일",
      ymd: "20241216",
      title: "공모주 상장",
      scrap_url: "",
    },
  ]);  
  const dayClick = (ymd: string, schedule:string) => {
    alert(`Date clicked: ${ymd} ${schedule}`);
  };
  const goHome = () => {
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
  }
  const showForm = () => {
    console.log(year, month);
    visibleForm = !visibleForm;
  }
  const editCancelNotice = () => {
    visibleForm = false;
  }
  const editChangeNotice = () => {
    visibleForm = false;
  }
  
</script>
  <main class="container">
    {#if visibleForm}
      <div>
        <CalendarEdit {editCancelNotice} {editChangeNotice}/>
      </div>
    {/if}
    <div class="horizon">
      <button onclick={minus} aria-label="Prev Month"><i class="fas fa-arrow-left"></i></button>
      <h3>{year}년 {month}월</h3>
      <button onclick={plus} aria-label="Next Month"><i class="fas fa-arrow-right"></i></button>
      <button onclick={goHome} aria-label="today"><i class="fas fa-arrow-right"></i></button>
      <button onclick={showForm} aria-label="edit calendar"><i class="fa-regular fa-pen-to-square"></i></button>
    </div>
    <CalendarMonth {year} {month} {holidays} {eventDays} {dayClick}/>
  </main>
<style>
  .horizon {
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: center;
    gap: 10px;
  }
  .horizon button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px; /* 버튼과 input을 동일한 높이로 */
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    background-color: #526b69;
  }
</style>