<!-- 
 <script>
    import InputYmd from './InputYmd.svelte';
    let dateValue = '20241104'; // 초기 값
  </script>
  
  <InputYmd bind:ymd={dateValue} />
  <p>선택한 날짜 (yyyymmdd): {dateValue}</p> 
-->
  
<script lang="ts">
  
    // export let ymd: string = ''; // yyyymmdd 형식으로 값을 유지하는 prop
    // let {ymd = ''} = $props();
    let { ymd} = $props()
    // 표시할 날짜 형식 (`YYYY-MM-DD`)
    //$: displayValue = formatDisplay(ymd);
    let displayValue = $derived(formatDisplay(ymd as string));
  
    // 사용자가 입력한 값을 yyyymmdd 형식으로 변환하는 함수
    function parseYmd(value: string): string {
      const cleanValue = value.replace(/\D/g, ''); // 숫자만 추출
      if (cleanValue.length === 8) {
        return cleanValue;
      }
      return value; // 유효하지 않은 경우 기존 값 유지
    }
  
    // yyyymmdd 값을 `YYYY-MM-DD` 형식으로 변환하는 함수
    function formatDisplay(value: string): string {
      if (value.length === 8) {
        return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
      }
      return value;
    }
  
    // 입력 핸들러: 표시 형식에서 yyyymmdd 형식으로 변환 후 업데이트
    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      const parsedValue = parseYmd(target.value);
      ymd = parsedValue; // ymd 값을 업데이트
    //   dispatch('input', ymd); // 변경 사항을 부모로 전달
    }
  </script>
  
  <input
    type="text"
    value={displayValue}
    maxlength="10"
    placeholder="YYYY-MM-DD"
    oninput={handleInput}
  />
  
  <style>
    input {
      width: 150px;
      padding: 2px;
      font-size: 1rem;
      text-align: center;
    }
  </style>
  