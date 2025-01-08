<!-- src/routes/main/+page.svelte -->
<script lang="ts">
  import type { TodoBase} from '$lib/types';
  import {putFetch, getFetch, postFetch} from '$lib/api';
  import TodoCard from '$lib/components/todo/TodoCard.svelte';
  let {data}  = $props();
  let editVisible = $state(false);
  let todos: TodoBase[] = $state(data.list)

  const loadTodos = async () => {
    const res = await getFetch<TodoBase[]>('/todo')
    console.log(res)
    todos = res;
  };

  $effect(() => {
    return () => {
      console.log('컴포넌트가 언마운트되었습니다.');
    };
  });
  
  function deleteClick(id:number){
    putFetch(`/todo/${id}`,{"id": id}).then(()=>{
      loadTodos();
    });
  }
  const addClick = () => {
    const input_todos:string[] = [];
    for (let i = 1; i <= 9; i++) {
        const input = document.getElementById(`todo-input${i}`) as HTMLInputElement;
        if (input && input.value.trim()) {
            input_todos.push(input.value.trim());
        }
    }

    if(input_todos.length === 0){
      alert('할 일을 입력하세요');
      return;
    }
    postFetch('/todo', {"todos": input_todos}).then(()=>{
      loadTodos();
    });
    // let checkbox = document.getElementById('edit-visible-checkbox') as HTMLInputElement;
    // checkbox.checked = false;
    editVisible = false;
  }
  const checkboxClick = () => {
    let checkbox = document.getElementById('edit-visible-checkbox') as HTMLInputElement;
    editVisible =  checkbox.checked;
    if (editVisible) {
      for (let i = 1; i <= 9; i++) {
        const input = document.getElementById(`todo-input${i}`) as HTMLInputElement;
        if (input) {
          input.value = '';
        }
      }
      const input = document.getElementById('todo-input1') as HTMLInputElement;
      input.focus();
    }
  }
</script>

<div class="main-area">
  <section class="content">
    <hgroup>
      <h2>Welcome to my world</h2>
      <p>Step down my world. Step into my heart. Leave your cares behind</p>
  </section>
  <section class="todo-area">
    <div class="todo-area-header">
      <label for="edit-visible-checkbox">
        <input type="checkbox" id="edit-visible-checkbox" name="edit-visible-checkbox" role="switch"  onclick={checkboxClick} />
        추가
      </label>      
      <!-- <label for="todo-chekcbox">추가</label> <input type="checkbox" id="edit-visible-checkbox" onclick={checkboxClick}/> -->
    </div>
    {#if editVisible}
    <div class="edit-area">
      <input type="text" id="todo-input1" /> <input type="text" id="todo-input2" /> <input type="text" id="todo-input3" />
      <button onclick={addClick}>추가</button>
    </div>
    {/if}
    <div class="list-area todo-card-container">
      {#each todos as todo}
      <TodoCard {todo} {deleteClick}/>
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
  .todo-area-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content {
      text-align: center;
      margin-top: 2rem;
  }
</style>
