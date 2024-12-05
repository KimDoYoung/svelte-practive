<!-- 파일명 : \src\routes\snote/+page.svelte -->
<script lang="ts">
	import { deleteFetch, getFetch } from "$lib/api";
  import SnoteEdit from "$lib/components/snote/SnoteEdit.svelte";
	import type { SnoteBase, SnoteCreate, SnoteList } from "$lib/types/snote";
  type SnotePageType = {
    limit: number,
    last_index: number,
    next_exist: boolean,
  }
  let pageInfo:SnotePageType = {
    limit: 10,
    last_index: 0,
    next_exist: false,
  };
  let next_exists: boolean = $state(false);
  let prev_exists: boolean = $state(false);

  let mode: string = $state('list')
  const upsertButtonClicked = (snote: SnoteCreate) => {
    console.log('저장 버튼 클릭' + JSON.stringify(snote, null, 2));
  }
  let snotes: SnoteBase[] = $state([]);

  const loadSnotes = async (param:{limit:number, start_index:number}) => {
    if(param.start_index < 0){
      param.start_index = 0;
    }
    console.log('snote가져오기' + JSON.stringify(param, null, 2));
    getFetch<SnoteList>('snote',param).then((res) => {
      console.log(res);
      snotes = res.snote_list;
      pageInfo.last_index = res.last_index;
      pageInfo.next_exist = res.next_exist;
      pageInfo.limit = res.limit;
      next_exists = res.next_exist;
      prev_exists = (res.last_index - res.limit) >= 0;
      console.log('next_exists : ' + next_exists);
      console.log('prev_exists : ' + prev_exists);
    });
  }
  const nextSnoteList = () => {
    let start_index = pageInfo.last_index + 1;
    loadSnotes({limit:10, start_index:start_index});
  }
  const prevSnoteList = () => {
    let start_index = pageInfo.last_index - pageInfo.limit;
    if (start_index < 0) {
      start_index = 0;
    }
    loadSnotes({limit:10, start_index:start_index});
  }
  const viewClick = (id:number) => {
    window.location.href = '/snote/'+id;
  }
  const editClick = (id:number) => {
    console.log('edit click' + id);
    mode = 'edit';
  }
  const deleteClick = (id:number) => {
    console.log('delete click' + id);
    if(!confirm('삭제하시겠습니까?')){
      return;
    }
    deleteFetch('/snote/'+id).then(()=>{
      loadSnotes({limit:10, start_index:pageInfo.last_index - pageInfo.limit});
    });
  }
  const cancelButtonClicked = () => {
    console.log('취소 버튼 클릭');
    mode = 'list';
  }
  $effect(() => {
    loadSnotes({limit:10, start_index:0});
    return () => {
      console.log('Snote 페이지가 언마운트 되었습니다.')
    }
  })
</script>
  <main class="container">
      <h1>Snote</h1>
      {#if mode === 'list'}
        <div class="btn-area"><button onclick={()=>{mode='edit'}}>추가</button></div>
        <div class="overflow-auto">
          <table class="striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">제목</th>
                <th scope="col">생성일시</th>
                <th scope="col">동작</th>
              </tr>
            </thead>
            <tbody>
              {#each snotes as snote, i}
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{snote.title}</td>
                  <td>{snote.create_dt}</td>
                  <td>
                    <button class="" aria-label="View" onclick={()=>viewClick(snote.id)}><i class="fa-regular fa-eye"></i></button>
                    <button class="secondary" aria-label="Edit" onclick={()=>editClick(snote.id)}><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="contrast" aria-label="Delete" onclick={()=>deleteClick(snote.id)}><i class="fa-solid fa-trash-can"></i></button>
                  </td>
                </tr>
              {/each}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">
                  {#if prev_exists}
                    <button onclick={()=>prevSnoteList()}>이전</button>
                  {/if}
                  {#if next_exists}
                  <button onclick={()=>nextSnoteList()}>더보기</button>
                  {/if}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      {:else}
        <SnoteEdit {upsertButtonClicked} {cancelButtonClicked}/>
      {/if}
  </main>
<style>
</style>