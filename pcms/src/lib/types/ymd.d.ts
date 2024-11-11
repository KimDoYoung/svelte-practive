// ymd.d.ts

// 0001년부터 9999년까지의 숫자를 표현하기 위한 유틸리티 타입
type Year = `${number}${number}${number}${number}`;
type Month = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;
type Day = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `${1 | 2}${number}` | `3${0 | 1}`;

// ymd 형식 정의
export type Ymd = `${Year}${Month}${Day}` | '';
