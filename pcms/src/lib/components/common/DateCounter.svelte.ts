import { todayYmd } from "$lib/utils";
import type { Ymd } from "$lib/types";

export enum YoilEnum {
  None,
  Hangul,
  Hanja
}
/**
 * 날짜를 증가, 감소하고, 요일을 표시하는 클래스
 */
export class DateCounter  {

  ymd = $state(todayYmd()) // YYYYMMDD
  displayYmd = $derived.by(()=>{
    let d = this.ymd.slice(0, 4)+'-'+this.ymd.slice(4, 6)+'-'+this.ymd.slice(6, 8)
    if (this.yoilType === YoilEnum.Hangul) {
      const yoil = ['일', '월', '화', '수', '목', '금', '토']
      const date = new Date(d)
      d = `${d} (${yoil[date.getDay()]})`
    }else if (this.yoilType === YoilEnum.Hanja) {
      const yoil = ['日', '月', '火', '水', '木', '金', '土']
      const date = new Date(d)
      d = `${d} (${yoil[date.getDay()]})`
    }else {
      d = `${d}`
    }
    return d;
  })
  yoilType = YoilEnum.None // 요일표시 enum

  constructor(ymd: Ymd, yoilType = YoilEnum.None) {
    this.ymd = ymd
    this.yoilType = yoilType
  }

  public prev = () => {
    this.ymd = this.changeDate(-1)
  }
  public next = () => {
    this.ymd = this.changeDate(1)
  }
  public today = () => {
    this.ymd = todayYmd()
  }

  private changeDate = (days: number) => {
    let ymd1 = this.ymd as string;
    const year = parseInt(ymd1.slice(0, 4));
    const month = parseInt(ymd1.slice(4, 6)) - 1;
    const day = parseInt(ymd1.slice(6, 8));
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + days);
    ymd1 = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    return ymd1 as Ymd
  }

}
