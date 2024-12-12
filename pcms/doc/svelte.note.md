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
