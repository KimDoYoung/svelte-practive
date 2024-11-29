// Calendar1Month.ts
import { CalendarBase } from "./calendar-base";
import { addYmd, cutString, zeroPad } from "./calendar-util";

export class Calendar1Month extends CalendarBase {
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
    super(holidays, eventDays);
  }

  private choiceDayNumberClass(dayIndex: number, ymd: string): string {
    const thisYm = `${this.currentYear}${zeroPad(this.currentMonth)}`;
    const isHoliday = this.holidays.some((holiday) => holiday.ymd === ymd);
    const isThisMonth = ymd.startsWith(thisYm);
    const isSunday = dayIndex % 7 === 0;
    const isSaturday = dayIndex % 7 === 6;

    if (!isThisMonth) {
      if (isHoliday || isSunday) return "not-this-month-holiday";
      if (isSaturday) return "not-this-month-saterday";
      return "not-this-month";
    }

    if (isHoliday || isSunday) return "text-holiday";
    if (isSaturday) return "text-saterday";
    return "";
  }

  private getEventClassName(eventName: string): string {
    if (eventName.includes("상장일")) return "event-sang";
    if (eventName.includes("청약일")) return "event-cheong";
    if (eventName.includes("환불일")) return "event-whan";
    if (eventName.includes("납입일")) return "event-nap";
    return "";
  }

  public renderCalendar(year: number, month: number): string {
    this.currentYear = year;
    this.currentMonth = month;

    const [startYmd, endYmd] = this.startEndYmd(year, month);
    const maxEventCount = this.getMaxEventCount(startYmd, endYmd);
    const heightStyle = maxEventCount >= 6 ? 'style="min-height: 200px;"' : "";

    let html = '<div class="row">';
    html += '<div class="col bg-light text-center text-danger week">일</div>';
    html += '<div class="col bg-light text-center week">월</div>';
    html += '<div class="col bg-light text-center week">화</div>';
    html += '<div class="col bg-light text-center week">수</div>';
    html += '<div class="col bg-light text-center week">목</div>';
    html += '<div class="col bg-light text-center week">금</div>';
    html += '<div class="col bg-light text-center week">토</div>';
    html += "</div>";

    let i = 0;
    let saveCloseDiv = "";
    let ymd = startYmd;
    const today = this.today();

    while (ymd <= endYmd) {
      if (i % 7 === 0) {
        html += saveCloseDiv;
        html += '<div class="row">';
        saveCloseDiv = "</div>";
      }

      const isToday = ymd === today;
      let dayHtml = `<div class="col day ${
        isToday ? "bg-today" : ""
      }" data-ymd="${ymd}" ${heightStyle}>`;
      const clsName = this.choiceDayNumberClass(i, ymd);
      dayHtml += `<span class="${clsName}">${parseInt(
        ymd.substring(6)
      )}</span>`;

      const holidayEvents = this.holidays.filter(
        (holiday) => holiday.ymd === ymd
      );
      holidayEvents.forEach((holiday) => {
        dayHtml += `<div class="holiday">${holiday.name}</div>`;
      });

      const eventDays = this.eventDays.filter((event) => event.ymd === ymd);
      eventDays.forEach((event) => {
        const company = cutString(event.company, 6);
        const eventClsName = this.getEventClassName(event.name);
        const url = event.scrap_url;
        const title = event.title;
        dayHtml += `<div class="${eventClsName} ipo_event" title="${title}"><a href="${url}" target="_blank">${company}</a> ${event.name}</div>`;
      });

      dayHtml += "</div>";
      html += dayHtml;

      ymd = addYmd(ymd, 1);
      i++;
    }
    html += "</div>";
    return html;
  }
}
