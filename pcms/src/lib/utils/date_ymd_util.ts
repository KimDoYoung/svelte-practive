export class DateYmdUtil {
  private static pad(num: number) {
    return num.toString().padStart(2, '0');
  }

  static todayYmd() {
    const today = new Date();
    return `${today.getFullYear()}${this.pad(today.getMonth() + 1)}${this.pad(today.getDate())}`;
  }
  static todayYear(){
    const today = new Date();
    return today.getFullYear();
  }
  static todayMonth(){
    const today = new Date();
    return today.getMonth() + 1;
  }
  static isValidYmd(ymd: string) {
    return /^\d{4}\d{2}\d{2}$/.test(ymd);
  }
  /**
   * yyyymmdd를 yyyy-mm-dd로 변환
   * @param yyyy-mm-dd
   * @returns 
   */
  static displayYmd(ymd: string) {
    //console.log("displayYmd:", ymd);
    if (!this.isValidYmd(ymd)) {
      return "XXXX-XX-XX";
    }
    return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
  }
}