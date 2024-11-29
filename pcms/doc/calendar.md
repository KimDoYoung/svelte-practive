# calendar 설명

## 구조

- CalenarBase를 슈퍼클래스로 달력을 표현하는 것에 중점을 두고 각 하위 클래스를 만들 수 있게 함.

1. calendar-util.ts  : 날짜관련 함수들 모음
2. calendar-base.ts : CalendarBase 추상클래스
3. calendar-1month.ts : 1달을 표현하는 클래스

## 사용법

```javascript
const holidays = [
  { name: "개천절", ymd: "20240506" },
  { name: "설날", ymd: "20240501" },
];

const eventDays = [
  {
    company: "노브랜드",
    name: "상장일",
    ymd: "20240516",
    title: "공모주 상장",
    scrap_url: "",
  },
];

const calendar = new Calendar1Month(holidays, eventDays);
console.log(calendar.renderCalendar(2024, 5));
```
