<!-- 파일명 : Calendar1Month.svelte -->
<script lang="ts">
  import '$lib/styles/calendar-month.css';
  import {Calendar1Month} from '$lib/utils/calendar/calendar-1month';  
  import type { CalendarResponse } from '$lib/types';

  type CalendarMonthType = {
    dayClick: (ymd: string, schedule: string) => void,
    year: number,
    month: number,
    calendar_data : CalendarResponse[],
  } ;
  let {dayClick, year, month, calendar_data}: CalendarMonthType = $props();
  const calendar = new Calendar1Month(calendar_data);
  let html = $derived.by(() => {
    calendar.setCalendarData(calendar_data);
    let html =  calendar.renderCalendar(year, month);
    console.log("[" + html + "]");
    return html;
  });

  let activeInput: HTMLInputElement | null = null; // 현재 활성화된 input 참조
  //click이벤트 핸들러
  const handleDayClick = (ymd: string, div: HTMLElement) => {
    if (activeInput) return; // 이미 input이 활성화된 경우 무시

    // 입력창 생성
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter schedule';
    input.style.width = '100%';
    input.style.marginTop = '5px';

    div.appendChild(input);
    input.focus();
    activeInput = input;

    // 키 이벤트 처리
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        dayClick(ymd, input.value); // 입력값 전달
        cleanupInput();
      } else if (event.key === 'Escape') {
        cleanupInput();
      }
    };

    // 입력창 닫기
    const cleanupInput = () => {
      input.removeEventListener('keydown', handleKeydown);
      div.removeChild(input);
      activeInput = null;
    };

    input.addEventListener('keydown', handleKeydown);
    input.addEventListener('blur', cleanupInput);
  };
  // 이벤트 바인딩
  $effect(() => {
    const calendarArea = document.getElementById('calendar-area');
    if (calendarArea) {
      const dayDivs = calendarArea.querySelectorAll('.day');
      dayDivs.forEach((div) => {
        const ymd = div.getAttribute('data-ymd');
        if (ymd) {
          div.addEventListener('click', () => handleDayClick(ymd, div as HTMLElement));
        }
      });
    }
  });
</script>
<!-- html -->
<div id="calendar-area">{@html html}</div>
<style>  
</style>