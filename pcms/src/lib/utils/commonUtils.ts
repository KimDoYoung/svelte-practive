import type { Ymd } from "$lib/types/ymd";

export function displayYmd(ymd: string, displayYoil=false): string {
    let s =  `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
    if (displayYoil) {
        const yoil = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date(s);
        s += `(${yoil[date.getDay()]})`;
    }
    return s;
}
// content 문자열 포맷팅: \r\n -> <br />, **text** -> <strong>text</strong>
export function displayContent(content: string | null | undefined): string {
    if (!content) return '';
    // 줄바꿈을 <br>로, **bold text**를 <strong>bold text</strong>로 변환
    return content
        .replace(/\r\n|\n/g, '<br />')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}  

export function url_concat(...parts: string[]): string {
    // 각 인자의 앞뒤 슬래시를 제거하고 배열로 만든 후, '/'로 연결
    return parts
        .map(part => part.replace(/^\/+|\/+$/g, '')) // 앞뒤 슬래시 제거
        .filter(part => part.length > 0)             // 빈 문자열 제거
        .join('/');
}

export function isWeekend(ymd:Ymd): boolean {
    const date = new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`);
    return date.getDay() === 0 || date.getDay() === 6;
}

export function todayYmd(): Ymd {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}${month}${day}` as Ymd; // yyyymmdd 형식으로 반환
  }