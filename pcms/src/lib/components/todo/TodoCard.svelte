<!-- 파일명 : C:\Users\deHong\Documents\kdy\svelte-practive\pcms\src\lib\components\todo/TodoCard.svelte -->
<script lang="ts">  
  import type { TodoBase } from '../../types';

  type TodoCardType = { 
    deleteClick: (id: number) => void,
    todo: TodoBase 
  }

  let {todo, deleteClick} : TodoCardType = $props()

</script>
<!-- html -->
<div class="todo-card">
  <div class="todo-card-content">{todo.content}</div>
  <div class="todo-card-date">{todo.input_dt}</div>
  <button 
    class="todo-card-delete" 
    aria-label="삭제" onclick={()=>deleteClick(todo.id)}>
    <i class="fas fa-x"></i>
  </button>  
</div>
<style>
.todo-card {
  position: relative;/* 삭제 버튼 위치 지정을 위해 상대적 위치 지정 */
  background-color: var(--background-secondary, #ded2d2);
  border: 1px solid var(--border, #ddd);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex: 1 1 calc(20% - 1rem);    /* 기본적으로 한 줄에 5개 */
  max-width: calc(20% - 1rem);   /* 최대 너비 제한 */
}

.todo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.todo-card-content {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: rgb(71, 71, 137);
}
.todo-card-date {
  font-size: 0.8rem;
  font-weight: 200;
  margin-bottom: 0.5rem;
  font-style: italic;
  color: rgb(134, 134, 148);
}
/* 삭제 버튼 */
.todo-card-delete {
  position: absolute;            /* 부모의 상대적 위치를 기준으로 배치 */
  bottom: 0.5rem;                   /* 상단 간격 */
  right: 0.5rem;                 /* 오른쪽 간격 */
  background-color: var(--primary, #ff4d4f);
  color: white;
  border: none;
  border-radius: 50%;            /* 둥근 버튼 */
  width: 2rem;                   /* 버튼 너비 */
  height: 2rem;                  /* 버튼 높이 */
  display: flex;                 /* 아이콘 중앙 정렬 */
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1rem;               /* X 아이콘 크기 */
}

.todo-card-delete:hover {
  background-color: var(--primary-hover, #d33a3c);
}

/* 반응형 미디어 쿼리 */
@media (max-width: 1200px) {
  .todo-card {
    flex: 1 1 calc(33.33% - 1rem); /* 한 줄에 3개 */
    max-width: calc(33.33% - 1rem);
  }
}

@media (max-width: 768px) {
  .todo-card {
    flex: 1 1 calc(50% - 1rem); /* 한 줄에 2개 */
    max-width: calc(50% - 1rem);
  }
}

@media (max-width: 480px) {
  .todo-card {
    flex: 1 1 100%; /* 한 줄에 1개 */
    max-width: 100%;
  }
}  
</style>