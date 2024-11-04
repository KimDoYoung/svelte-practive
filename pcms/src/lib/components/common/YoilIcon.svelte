<script>
    export let ymd = '';             // 날짜 (yyyymmdd 형식으로)
    export let bgColor = '#fff';      // 배경색
    export let textColor = '#000';    // 글자색
    export let hanja = false;         // 한자 표시 여부
    export let width = '30px';        // 너비 (기본값 30px)
    export let height = '30px';       // 높이 (기본값 30px)
  
    // 요일 한글 배열
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekdaysHanja = ['日', '月', '火', '水', '木', '金', '土'];
  
    // 요일을 계산하는 함수
    $: dayOfWeek = (() => {
      if (ymd.length === 8) {
        const year = parseInt(ymd.slice(0, 4));
        const month = parseInt(ymd.slice(4, 6)) - 1;
        const day = parseInt(ymd.slice(6, 8));
        const date = new Date(year, month, day);
        return hanja ? weekdaysHanja[date.getDay()] : weekdays[date.getDay()];
      }
      return ''; // 유효하지 않은 형식일 때 빈 문자열 반환
    })();
  </script>
  
  <style>
    .day-box {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  
  <div
    class="day-box"
    style="background-color: {bgColor}; color: {textColor}; width: {width}; height: {height};"
    aria-label="요일: {dayOfWeek}"
  >
    {dayOfWeek}
  </div>
  