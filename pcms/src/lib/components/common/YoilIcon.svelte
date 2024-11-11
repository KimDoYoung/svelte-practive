<script lang="ts">
    let {
        ymd = '' , // 날짜 (yyyymmdd 형식으로)
        bgColor = '#fff', // 배경색
        textColor = '#000', // 글자색
        hanja = false, // 한자 표시 여부
        width = '30px', // 너비 (기본값 30px) 
        height = '30px' // 높이 (기본값 30px)
    } = $props()
    // 요일 한글 배열
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekdaysHanja = ['日', '月', '火', '水', '木', '金', '土'];
    let dayOfWeek = $state(''); // 요일

    $effect( () => {
        if (ymd.length === 8) {
            const year = parseInt(ymd.slice(0, 4));
            const month = parseInt(ymd.slice(4, 6)) - 1;
            const day = parseInt(ymd.slice(6, 8));
            const date = new Date(year, month, day);
            dayOfWeek = hanja ? weekdaysHanja[date.getDay()] : weekdays[date.getDay()];
        }else {
            dayOfWeek = '';
        }
    })

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
  