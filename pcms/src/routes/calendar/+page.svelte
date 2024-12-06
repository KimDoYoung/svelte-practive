<!-- 파일명 : src\routes\calendar/+page.svelte -->
<script lang="ts">
  import  CalendarMonth  from '$lib/components/calendar/CalendarMonth.svelte';
  let year = $state(2024)
  let month = $state(12)
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
</script>
  <main class="container">
      <div class="horizon">
        <button onclick={minus}>-</button>
        <h2>{year}년 {month}월</h2>
        <button onclick={plus}>+</button>
      </div>
      <CalendarMonth {year} {month} {holidays} {eventDays}/>
  </main>
<style>
  .horizon {
    display: flex;
    justify-content: space-between;
  }
</style>