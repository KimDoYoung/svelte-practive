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
