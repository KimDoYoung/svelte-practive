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
</script>
  <main class="container">
      <h1>Calendar</h1>
      <button onclick={plus}>+</button>
      <CalendarMonth {year} {month}/>
  </main>
<style>
  
</style>