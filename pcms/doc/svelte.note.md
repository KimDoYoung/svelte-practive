# svelte.note.md

## modal 사용하는 방법

## 컴포넌트에서 event

1. $props()로 받는다.

```javascript
  import type { TodoBase } from '../../types';

  type TodoCardType = { 
    deleteClick: (id: number) => void,
    todo: TodoBase 
  }

  let {todo, deleteClick} : TodoCardType = $props()
  
  <button 
    class="todo-card-delete" 
    aria-label="삭제" onclick={()=>deleteClick(todo.id)}>
    <i class="fas fa-x"></i>
  </button> 
```

## effect

```javascript
  $effect(() => {
    loadSnotes({limit:10, start_index:0});
    return () => {
      console.log('Snote 페이지가 언마운트 되었습니다.')
    }
  })
```

## $start

- create state, 변화하면 화면이 바뀐다.

## +page.ts와 +page.svelte

+page.ts

```javascript
import type { PageLoad } from './$types';
import { API_BASE_URL } from '$lib/pcms_config';
import type { MovieReviewListResponse } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  // 기본 URL 설정
  const url = `${API_BASE_URL}/movie_reviews`;
  console.log('url:', url);
  // 데이터 fetch
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch movie reviews: ${res.statusText}`);
  }

  const data: MovieReviewListResponse = await res.json();
  console.log('data:', data);
  // return { props: { data } };
  return data;
};
```

- +page.svelte

```javascript
 let {data} = $props();
 ...
  {#each data.list as review, index}
    <div>{index+1} {review.title}</div>
  {/each}
```
