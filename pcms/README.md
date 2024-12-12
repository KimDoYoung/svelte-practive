# PCMS

## 개요

- sveltekit으로 typescript를 사용해서 kalpadb-api와 통신으로 데이터취득

1. project명 : pcms

2. 기술-stack
    - sveltekit
    - Restful api server (kalpadb-api)와 통신으로 데이터를 주고받음.
    - typescript사용
    - pico css lib 사용
    - font-awesome 사용

3. 개발환경
    - window 10
    - vs-code
    - node 20.18.0
    - npm 10.8.2
    - svelte 5.1.9 , svelte-kit
    - github

## 초기 설정

1. env에 이렇게 함

  KALPADB_API_URL_BASE=<http://jskn.iptime.org:8088/api/v1>

2.npm install @picocss/pico 을 수행함.

- [examples](https://codesandbox.io/embed/4mrnhq?)

3.src/app.css에
  
@import "@picocss/pico/css/pico.min.css";

```shell
find node_modules/ -name "pico.min.css"  -print
```

1. routes/+layout.svelte

```html
<!-- src/routes/+layout.svelte -->
<script>
    import "../app.css";
</script>

<slot />
```

5. fontawesome의 사용

```shell
npm install @fortawesome/fontawesome-free
```

## Profile

- development와 product로 나눔.
- vite.config.ts 작성

## 참고

- [Task manage](https://www.youtube.com/watch?v=uSWMvDPpG0k)

## 소감

뭔가 정립된 방법이 있어야하지 않을까? 생각이 든다. 반응성이라는 것이 좋긴한데, 두번 데이터를 가져온다든지.
두번 rendering된다든지 한다.

- 짧은 코드로 동작과 의미를 확인
- 개발 방법 즉 정해진 방법을 기록하고 그대로 하는게 좋지 않을까?
- 반응성을 따라가면서 디버그 할 수 있는 방법이 있으면 좋을텐데.

### 의문점 확인해서 명확히 인지할 것들


