<script lang="ts">
	import { getFetch } from '$lib/api';
	import SearchInput from '$lib/components/common/SearchInput.svelte';
  import EssayList from '$lib/components/essay/EssayList.svelte';
  import EssayView from '$lib/components/essay/EssayView.svelte';
	import type { EssayListResponse,EssayBase } from '$lib/types';
  
  let {data} = $props();
  let pageNo = $state(1);
  let search_text = '';
  let mode = $state('list');
  let essay: EssayBase = $state({
    id: 0,
    title: '',
    content: '',
    create_dt: '',
    lastmodify_dt: ''
  });
  $effect(() => {
    console.log('컴포넌트가 마운트되었습니다.');
    return () => {
          console.log('컴포넌트가 언마운트되었습니다.');
          // 정리 작업 수행
      };
  });
  const loadPage = () => {
    const url = '/essays';
    const params = {
      search_text: search_text,
      limit : 10,
      start_index : (pageNo - 1) * 10,
      title_only: true
    };
    getFetch(url, params).then((res) => {
      console.log(res);
      data = res as EssayListResponse;
      pageNo = Math.ceil((data.start_index + data.data_count) / data.page_size);
    });
  }
  const searchInputClick = (keyword: string) => {
    console.log(keyword);
    search_text = keyword;
    pageNo = 1;
    loadPage();
  }
  //삭제버튼
  const deleteClick = (id: number) => {
    console.log('deleteButtonClick:', id);
  }
  //보기
  const viewClick = (id: number) => {
    console.log('selectedClick:', id);
    getFetch(`/essay/${id}`).then((res) => {
      console.log(res);
      essay = res as EssayBase;
      mode = 'view';
    });
  }
  //수정
  const editClick = (id: number) => {
    console.log('editClick:', id);
  }
  //뒤로가기
  const backtoButtonClick = (id: number) => {
    console.log('backtoButtonClick:', id);
    mode = 'list';
  }
</script>
<section class="list-section" class:visible = {mode === 'list'} class:invisible= {mode !== 'list'}>  
  <div class="search-area grid">
    <SearchInput searchInputClick={searchInputClick} placeholder_text="검색어를 입력해주세요." />
    <input type="button" value="글쓰기" onclick={() => {mode = 'write';}} />
  </div>
  <div>
    <EssayList data={data} pageNo={pageNo} {deleteClick} {viewClick} {editClick}/>
  </div>
  <div class="page-move-area">
    {#if data.start_index > 0}
      <input type="button" value="이전" onclick={() => {pageNo--;loadPage();}} />
    {/if}
    {#if data.exists_next}
      <input type="button" value="다음" onclick={() => {pageNo++;loadPage();}} />
    {/if}
  </div>
</section>
<section class="section-view" class:visible={mode === 'view'} class:invisible={mode !== 'view'}>
  <EssayView {essay} {backtoButtonClick} />
</section>  
<style>
  .page-move-area {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    gap: 10px;
  }
  .page-move-area input {
    padding: 5px 10px;
    border: 1px solid #9076f0;
    border-radius: 5px;
    background-color: #667ee7;
    width : 100px;
  }

  .visible {
    display: block;
  }
  .invisible {
    display: none;
  }
</style>