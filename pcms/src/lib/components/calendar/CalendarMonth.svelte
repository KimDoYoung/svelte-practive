<!-- 파일명 : Calendar1Month.svelte -->
<script lang="ts">
  import '$lib/styles/calendar-month.css';
  import {Calendar1Month} from '$lib/utils/calendar/calendar-1month';  
  type CalendarMonthType = {
    year: number,
    month: number,
    holidays: {name: string, ymd: string}[],
    eventDays: {company: string, name: string, ymd: string, title: string, scrap_url: string}[]
  } ;
  let {year, month, holidays, eventDays}: CalendarMonthType = $props();
  const calendar = new Calendar1Month(holidays, eventDays);
  let html = $derived.by(() => {
    let html =  calendar.renderCalendar(year, month);
    console.log("[" + html + "]");
    return html;
  });

</script>
<!-- html -->
<div id="calendar-area">{@html html}</div>
<style>  
</style>