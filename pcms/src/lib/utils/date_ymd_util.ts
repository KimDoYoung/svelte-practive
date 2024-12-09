export class DateYmdUtil {
  private static pad(num: number) {
    return num.toString().padStart(2, '0');
  }

  static getTodayYmd() {
    const today = new Date();
    return `${today.getFullYear()}-${this.pad(today.getMonth() + 1)}-${this.pad(today.getDate())}`;
  }
  static isValidYmd(ymd: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(ymd);
  }
}