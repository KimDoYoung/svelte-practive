import type { Ymd } from "$lib/types/ymd";

export function generateHashCode(input: string) {
  let hash = 0;
  if (input.length === 0) return hash;

  for (let i = 0; i < input.length; i++) {
    const chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // 32비트 정수로 변환
  }

  return hash;
}

// 런타임 검사 함수
export function isValidYmd(input: string): input is Ymd {
  const ymdRegex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
  return ymdRegex.test(input);
}

// 변환 함수
export function toYmd(input: string): Ymd {
  if (isValidYmd(input)) {
    return input; // input이 Ymd 형식으로 확인되면 그대로 반환
  }
  throw new Error(`Invalid Ymd format: ${input}`);
}
export function toStr(ymd: Ymd): string {
  if (ymd === '') {
      throw new Error('Ymd is an empty string');
  }
  if (!/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(ymd)) {
      throw new Error(`Invalid Ymd format: ${ymd}`);
  }
  return ymd;
}
/**
 * ymd의 요일 문자를 반환
 * @param ymd yyyymmdd 형식의 날짜 문자열
 * @param hanja 한자 요일문자를 리턴할지 여부
 * @returns 요일문자
 */
export function yoil(ymd: Ymd, hanja=false): string {
    const date = new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`);
    const yoil = ['일', '월', '화', '수', '목', '금', '토'];
    const hanjaYoil = ['日', '月', '火', '水', '木', '金', '土'];
    if(hanja) return hanjaYoil[date.getDay()];
    return yoil[date.getDay()];
}
/**
 * ymd가 토요일인지 여부(boolean)를 반환
 * @param ymd 
 * @returns 토요일인 경우 true, 나머지는 false
 */
export function isSaterday(ymd: string | Ymd): boolean {
  if (typeof ymd === 'string') {
    if (!isValidYmd(ymd)) {
      throw new Error(`Invalid Ymd format: ${ymd}`);
    }
  }  
  const date = new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`);
  return date.getDay() === 6;
}
/**
 * 일요일인지 여부를 반환
 * @param ymd Ymd타입
 * @returns 일요일 경우 true, 나머지는 false
 */
export function isSunday(ymd: Ymd | string): boolean {
    const date = new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`);
    return date.getDay() === 0;
}
/**
 * ymd를 'yyyy-mm-dd (요일)' 형식으로 반환
 * @param ymd yyyymmdd 형식의 날짜 문자열
 * @param displayYoil 요일을 표시할지 여부
 * @param hanja 한자 요일을 표시할지 여부
 * @returns 'yyyy-mm-dd (요일)' 형식의 날짜 문자열
 */
export function displayYmd(ymd: string, displayYoil=false, hanja=false): string {
    let s =  `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
    const y = yoil(ymd as Ymd, hanja);
    if (displayYoil) {
        s += ` (${y})`;
    }
    return s;
}
// content 문자열 포맷팅: \r\n -> <br />, **text** -> <strong>text</strong>
/**
 * enter나 **를 포함한 문자열을 화면에 출력할 수 있도록 변환
 * \r\n -> <br />
 * **text** -> <strong>text</strong>
 * 
 * @param content html태그를 포함한 문자열
 * @returns HTML태그를 포함한 문자열
 */
export function displayContent(content: string | null | undefined): string {
    if (!content) return '';
    // 줄바꿈을 <br>로, **bold text**를 <strong>bold text</strong>로 변환
    return content
        .replace(/\r\n|\n/g, '<br />')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}  

/**
 * url의 각 부분을 연결하여 완전한 url을 반환
 * 각각의 부분에서 앞뒤 슬래시를 제거하고, '/'로 연결
 * @param parts url의 각 부분
 * @returns 
 */
export function url_concat(...parts: string[]): string {
    // 각 인자의 앞뒤 슬래시를 제거하고 배열로 만든 후, '/'로 연결
    return parts
        .map(part => part.replace(/^\/+|\/+$/g, '')) // 앞뒤 슬래시 제거
        .filter(part => part.length > 0)             // 빈 문자열 제거
        .join('/');
}

/**
 * 주말인지 여부를 반환
 * @param ymd Ymd타입
 * @returns 토,일인경우 true, 나머지는 false
 */
export function isWeekend(ymd:string): boolean {
    const date = new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`);
    return date.getDay() === 0 || date.getDay() === 6;
}

/**
 * 오늘 날짜를 yyyymmdd 형식으로 반환
 * @returns Ymd타입
 */
export function todayYmd(): Ymd {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}${month}${day}` as Ymd; // yyyymmdd 형식으로 반환
}

export function clean_text(text: string): string {
  return text
  .replace(/\n/g, '\\n') // 줄바꿈 처리
  .replace(/\t/g, '\\t') // 탭 처리
  .replace(/"/g, '\\"') // 따옴표 이스케이프
  .replace(/\\/g, '\\\\') // 백슬래시 이스케이프
  .trim(); // 앞뒤 공백 제거
}

export function displayMoney(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}