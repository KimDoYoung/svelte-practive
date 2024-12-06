<!-- 파일명 : Calendar1Month.svelte -->
<script lang="ts">
  import '$lib/styles/calendar.css';
  import {Calendar1Month} from '$lib/utils/calendar/calendar-1month';  
  type CalendarMonthType = {
    year: number,
    month: number
  } ;
  const calendar = new Calendar1Month([], []);
  let {year, month}: CalendarMonthType = $props();
  let html = $derived.by(() => {
    return calendar.renderCalendar(year, month);
  });

</script>
<!-- html -->
<div id="calendar-area">{@html html}</div>
<style>  
</style>