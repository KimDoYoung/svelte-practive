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
  let calendar :Calendar1Month =  new Calendar1Month(year,month, calendar_data);

    // let html = $state('');
  let html = $derived.by( () => {
      console.log('Calendar1Month render');
      calendar.setCalendarData(calendar_data);
      const html = calendar.renderCalendar(year, month)
      // attachClickEvent();
      return html;
    }
  );
  
  
  let activeInput: HTMLInputElement | null = null; // 현재 활성화된 input 참조
  //click이벤트 핸들러
  const handleDayClick = (ymd: string, div: HTMLElement) => {
    console.log('click event');
    if (activeInput) return; // 이미 input이 활성화된 경우 무시

    // 입력창 생성
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter schedule';
    input.style.width = '100%';
    input.style.marginTop = '20px';

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
      //if(!input) return;
      input.removeEventListener('keydown', handleKeydown);
      input.removeEventListener('blur', cleanupInput);
      if (input.value) {
        //div.textContent = input.value;
      }
      if(!div) return;
      div.removeChild(input);
      activeInput = null;
    };

    input.addEventListener('keydown', handleKeydown);
    input.addEventListener('blur', cleanupInput);
  };

  const attachClickEvent = () => {
    const calendarArea = document.getElementById('calendar-area');
    if (calendarArea) {
      const dayDivs = calendarArea.querySelectorAll('.day');
      dayDivs.forEach((div) => {
        const ymd = div.getAttribute('data-ymd');
        if (ymd && div instanceof HTMLElement) {
          const handleClick = () => handleDayClick(ymd, div); // 동일 참조 사용
                div.removeEventListener('click', handleClick); // 제거 가능
                div.addEventListener('click', handleClick); // 이벤트 재등록          
          console.log('click event attached');
        }
      });
    }
  };
  $effect(() => {

    attachClickEvent();
    // calendar.setCalendarData(calendar_data);
    // attachClickEvent();
    // html =  calendar.renderCalendar(year, month);
    // console.log(`[${html}]`);
    return () => {
      console.log('Calendar1Month 언마운트 되었습니다');
    };
  });
</script>
<!-- html -->
<div id="calendar-area">{@html html}</div>
<style>  
</style>