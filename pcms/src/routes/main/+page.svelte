<!-- src/routes/main/+page.svelte -->
<script lang="ts">
  import {type TodoBase} from '$lib/types';
  import {getFetch} from '$lib/api';
  import TodoCard from '$lib/components/todo/TodoCard.svelte';

  let todos: TodoBase[] = $state([]);
  const loadTodos = async () => {
    const res = await getFetch<TodoBase[]>('/todo')
    console.log(res)
    todos = res;
  };
  $effect(() => {
    
    loadTodos();

    return () => {
      console.log('컴포넌트가 언마운트되었습니다.');
      // 정리 작업 수행
    };
  });
</script>

<div class="main-area">
  <section class="content">
      <h1>Welcome to my world</h1>
      <p>Step into my heart. Leave your cares behind</p>
  </section>
  <section class="todo-area">
    <div class="edit-area">
    </div>
    <div class="list-area todo-card-container">
      {#each todos as todo}
      <TodoCard {todo} />
      {/each}
    </div>
  </section>
</div>

<style>
  .todo-card-container {
    display: flex;
    flex-wrap: wrap;                /* 줄 바꿈 허용 */
    gap: 1rem;                      /* 카드 간 간격 */
    justify-content: flex-start;  /* 카드 간 균등 간격 */
  }
  .content {
      text-align: center;
      margin-top: 2rem;
  }
</style>
