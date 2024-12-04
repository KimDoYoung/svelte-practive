// CalendarBase.ts
import {
  zeroPad,
  yoilNumber,
  substractYmd,
  addYmd,
  getEndYmd,
  todayYmd,
} from "./calendar-util";

export abstract class CalendarBase {
  protected currentYear: number;
  protected currentMonth: number;
  protected holidays: { name: string; ymd: string }[] = [];
  protected eventDays: {
    company: string;
    name: string;
    ymd: string;
    title: string;
    scrap_url: string;
  }[] = [];

  constructor(
    holidays: { name: string; ymd: string }[] = [],
    eventDays: {
      company: string;
      name: string;
      ymd: string;
      title: string;
      scrap_url: string;
    }[] = []
  ) {
    this.holidays = holidays;
    this.eventDays = eventDays;
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
  }

  /** 이전 월 계산 */
  public prevYearMonth(year: number, month: number): [number, number] {
    if (month === 1) return [year - 1, 12];
    return [year, month - 1];
  }

  /** 다음 월 계산 */
  public nextYearMonth(year: number, month: number): [number, number] {
    if (month === 12) return [year + 1, 1];
    return [year, month + 1];
  }

  /** 해당 월의 시작일과 끝일 계산 */
  protected startEndYmd(year: number, month: number): [string, string] {
    const startYoil = yoilNumber(year, month, 1);
    const endYmd = getEndYmd(year, month);
    const lastDay = parseInt(endYmd.substring(6));
    const endYoil = yoilNumber(year, month, lastDay);

    const startYmd = substractYmd(`${year}${zeroPad(month)}01`, startYoil);
    const extendedEndYmd = addYmd(endYmd, 6 - endYoil);
    return [startYmd, extendedEndYmd];
  }

  /** 주어진 범위에서 이벤트 최대 개수 계산 */
  protected getMaxEventCount(startYmd: string, endYmd: string): number {
    let maxCount = 0;
    let ymd = startYmd;
    while (ymd <= endYmd) {
      const eventCount = this.eventDays.filter((event) => event.ymd === ymd)
        .length;
      maxCount = Math.max(maxCount, eventCount);
      ymd = addYmd(ymd, 1);
    }
    return maxCount;
  }

  /** 달력 렌더링 메서드 (구현은 상속받은 클래스에서 정의) */
  public abstract renderCalendar(year: number, month: number): string;

  /** 오늘 날짜 반환 */
  public today(): string {
    return todayYmd();
  }

  /** 휴일과 이벤트를 동적으로 업데이트 */
  public setHolidays(holidays: { name: string; ymd: string }[]): void {
    this.holidays = holidays;
  }

  public setEventDays(
    eventDays: {
      company: string;
      name: string;
      ymd: string;
      title: string;
      scrap_url: string;
    }[]
  ): void {
    this.eventDays = eventDays;
  }
}