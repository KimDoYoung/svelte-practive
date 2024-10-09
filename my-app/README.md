# my-app

- svelte로 app 연습을 목적으로 한다.
- kalpadb-api와 같은 Restful Api를 갖고 있다고 치고
- [sveltekit](https://kit.svelte.dev/)을 이용해서 개발
- bootstrap5을 쓰는 것으로 한다


## 프로젝트의 생성

```shell
$ node -v
v20.18.0

$ npm -v
10.8.2
```

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

## 콤포넌트 만들기

1. lib폴더에 title.svelte작성

```html
<script>
export let title = "Hello, World!";
</script>
<h1 class="text-danger">{title}</h1>
<style>
</style>
```

2. page.svelte

```html
<script>
import Title from '$lib/title.svelte';  
</script>

<Title title="콤포넌트연습" />
```

## Routing

- routes 폴더 안에 폴더 구조로 path를 나타낸다
- 특별한 이름의 파일 : +page.svelte

## Layout

- +layout.svelte 가 페이지를 감싸는 틀같은 것
- global.css를 정할 수 있다.
- inherite 즉 상속받는 개념이다.
- +page@(auth)svelte, +page@.svelte 와 같이 @로 지정할 수 있다

```html
<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "../styles/global.css";
</script>
```

## API Route

1. demo-api 폴더를 만들고 그 안에 +server.js를 만들다.
```
export function GET(){
    return new Response('Hello from the server!'); 
}
```
2. url /demo-api 하면 문자열이 나온다.

3. +server.js 

```javascript
import { json } from '@sveltejs/kit';
import { comments } from '$lib/comments.js';

export async function GET() {
    return json(comments);
}

// export function GET(){
//     return new Response(JSON.stringify(comments), {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }

```

* $lib/comments.js

```javscript
export const comments = [
    { "id": 1, "comment": "This is a comment" },
    { "id": 2, "comment": "This is another comment" },
    { "id": 3, "comment": "This is a third comment" }
];
```
* +page.js 와 +page.server.js가 았다.
* universal 과 server load function이라고 이름을 붙인 모양이다.
* universal 즉 +page.js는 client즉 browser쪽에서 실행, 민감한 key가 노출될 수 있다.
* load, data 와 같은 이름은 고정되어 있는가보다.
* +server.page.js에서
```javascript
export const load =  async ( loadEvent ) =>{
    const {fetch} = loadEvent;
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    console.log(posts)
    const title = 'Fetch Test';
    return {
        posts,
        title
    }
} 
```