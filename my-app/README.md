# my-app

- svelte로 app 연습을 목적으로 한다.
- kalpadb-api와 같은 Restful Api를 갖고 있다고 치고
- [sveltekit](https://kit.svelte.dev/)을 이용해서 개발
- bootstrap5을 쓰는 것으로 한다

## 프로젝트의 생성

1. sveltekit 프로젝트의 생성

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run dev -- --open
```

- ts를 사용하지 않고 js를 사용한다.

2. bootstrap5의 설치

```shell
npm install -D bootstrap
```

- -D를 써야하나?

3. routes 폴더 하위의 +layout.svlete 에 import

```html
<script>
    import "bootstrap/dist/css/bootstrap.min.css";
</script>
```
