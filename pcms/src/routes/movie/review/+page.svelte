<!-- 
  파일명 : /review/+page.svelte
  영화감상평 검색
-->
<script lang="ts">
  import SearchInput from "$lib/components/common/SearchInput.svelte";
  import NationalFlag from "$lib/components/common/NationalFlag.svelte";
  import StarLevel from "$lib/components/common/StarLevel.svelte";
	import { deleteFetch, getFetch, postFetch } from "$lib/api.js";
	import type { MovieReviewListResponse, MovieReviewItem } from "$lib/types";
  import MovieReviewDetail from "$lib/components/movie/MovieReviewDetail.svelte";
  import MovieReviewEdit from "$lib/components/movie/MovieReviewEdit.svelte";
	import { DateYmdUtil } from "$lib/utils/date_ymd_util.js";

	// import { load } from "../../+page.server";
  let {data}= $props();
  let mode = $state('list');
  let pageNo = $state(1);
  let search_text = "";
  let review = $state({} as MovieReviewItem);

  //1페이지의 리스트 데이터를 가져온다
  const loadPage = async () => {
    let start_index = (pageNo - 1) * 10;
    let params = {
      start_index: start_index,
      search_text: search_text,
      limit : 10,
      include_content:false
    }
    console.log("params", params);
    getFetch<MovieReviewListResponse>("/movie_reviews", params).then((response) => {
      console.log("response", response);
      data = response;
      pageNo = Math.floor(data.start_index / 10) + 1;
    });
  }
  //1개의 영화감상평을 가져온다
  const LoadView = (id:number) => {
    getFetch<MovieReviewItem>("/movie_review/" + id).then((response) => {
      console.log("response", response);
      review =  response;
    });
  }
  //검색어 입력 후 검색버튼 클릭
  const searchInputClick = (keyword: string) => {
    console.log("검색버튼 click " + keyword);
    search_text = keyword;
    pageNo = 1;
    loadPage();
  }
  //다음버튼
  const handleNextButton = () => {
    console.log("다음버튼 클릭");
    pageNo += 1;
    loadPage();
  }
  //이전버튼
  const handlePrevButton = () => {
    console.log("이전버튼 클릭");
    pageNo -= 1;
    if (pageNo < 1) {
      pageNo = 1;
    }
    loadPage();

  }
  // 제목클릭 상세보기
  const clickMovieReview = (e: MouseEvent) => {
    console.log("clickMovieReview", e);
    const target = e.target as HTMLElement;
    const id = target.getAttribute("data-id");
    console.log("id", id);
    LoadView(Number(id));
    mode = 'view';
  }  
  // 삭제
  const handleDelete = (e: MouseEvent) => {
    console.log("handleDelete", e);
    // const target = e.target as HTMLElement;
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const id = target.getAttribute("data-id");
    const title = target.getAttribute("data-title");
    console.log("id", id);
    if (confirm(`[${title}] 삭제하시겠습니까?`)) {
      deleteFetch("/movie_review/" + id).then((response) => {
        console.log("response", response);
        loadPage();
      });
    }
  }
  //리스트화면 이동
  const handleGoListButton = () => {
    mode = 'list';
  };
  //수정화면 이동
  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("handleEdit", e);
    
    // 클릭한 요소에서 가장 가까운 <a> 태그를 찾음
    const target = (e.target as HTMLElement).closest('a');
    if (target) {
      const id = target.getAttribute("data-id");
      console.log("edit id", id);
      if (id) {
        LoadView(Number(id));
        mode = 'update';
      }
    }
  };
  //신규화면 이동
  const handleNewButton = () => {
    const today = DateYmdUtil.todayYmd();
    mode = 'insert';
  };
  // 신규등록
  const handleInsertButton = (review: MovieReviewItem) => {
    console.log("handleInsertButton", review);
    review.ymd = review.ymd;
    review.lvl = review.lvl;
    review.nara = review.nara;
    review.year = review.year;
    review.content = review.content;
    console.log("review", review);
    postFetch("/movie_review", review).then((response) => {
      console.log("response", response);
      loadPage();
      mode = 'list';
    }).catch((error) => {
      console.log("error", error);
      alert("저장 중 오류 발생");
    });
  };
  $effect(() => {
    console.log("영화감상평....effect");
    return () => {
      console.log("영화감상평.... cleanup");
    };
  });
</script>
<section class="movie-review-list" class:visible={mode === 'list'} class:hidden={mode !== 'list'}>
    <div class="top-button-area">
      <SearchInput {searchInputClick} placeholder_text="검색어..."/> 
      <button aria-label="추가" onclick={handleNewButton}  >
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  {#if data.list.length === 0}
    <div>검색결과가 없습니다.</div>
  {:else}
    {#each data.list as review, index}
    <div class="review-item">
      <div class="review-item__left">
        <div class="review-item__title">{(pageNo-1)*10+index+1} <a href="#none" onclick={clickMovieReview} data-id="{review.id}">{review.title}</a></div>
      </div>
      <div class="review-item__right">
        <div class="review-item__nara"><NationalFlag country={review.nara}/></div>
        <div class="review-item__year">{review.year}</div>
        <div class="review-item__ymd">{DateYmdUtil.displayYmd(review.ymd)}</div>
        <div class="review-item__lvl"><StarLevel level={review.lvl}/></div>
        <div class="review-item__delete">
          <a href="#none" data-title={review.title} data-id={review.id} onclick={handleDelete} aria-label="delete review">
              <i class="fa-solid fa-trash-can"></i>
          </a>
        </div>
        <div class="review-item__update">
          <a href="#none" data-title={review.title} data-id={review.id} onclick={handleEdit} aria-label="edit review">
              <i class="fa-solid fa-edit"></i>
          </a>
        </div>
      </div>
    </div>    
    {/each}
    <div class="button-area">
      {#if (data.start_index > 0)}
        <button onclick={handlePrevButton}>이전</button>
      {/if}
      {#if data.next_data_exists}
        <button onclick={handleNextButton}>다음</button>
      {/if}
    </div>
  {/if}
</section>

<section class="movie-review-view"  class:visible={mode === 'view'} class:hidden={mode !== 'view'}>
  <MovieReviewDetail {review} {handleGoListButton}/>
</section>

<section class="movie-reivew-edit"  class:visible={mode === 'insert'} class:hidden={mode !== 'insert'}>
  <MovieReviewEdit mode="insert"  {handleGoListButton} {handleInsertButton}/>
</section>

<style>
  a {
    text-decoration: none;
    color: black;
  }
  .button-area {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 10px;
  }
  .review-item {
    display: flex; /* Flexbox로 레이아웃 배치 */
    justify-content: space-between; /* 왼쪽과 오른쪽 사이를 최대한 벌림 */
    align-items: center; /* 세로 중앙 정렬 */
    padding: 10px; /* 간격 조정 */
    border-bottom: 1px solid #ccc; /* 각 리뷰 아이템을 구분하기 위한 선 */
  }
  .review-item:hover {
    background-color: #f9f9f9; /* 마우스를 올렸을 때 배경색 변경 */
  }

  .review-item__left {
    flex: 1; /* 왼쪽 영역은 유연하게 크기 조정 */
    text-align: left; /* 왼쪽 정렬 */
  }

  .review-item__right {
    display: flex; /* 오른쪽 속성들을 가로로 배치 */
    gap: 15px; /* 속성들 사이에 간격 추가 */
    flex-shrink: 0; /* 오른쪽 영역의 크기 축소 방지 */
    text-align: right; /* 오른쪽 정렬 */
  }

  .review-item__title {
    font-weight: bold; /* 제목을 굵게 표시 */
    text-align: left; /* 제목은 항상 왼쪽 정렬 */
    cursor: pointer; /* 마우스가 가면 클릭할 수 있게 커서 변경 */  
  }

  .review-item__year,
  .review-item__nara,
  .review-item__lvl {
    white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 */
  }

  .hidden {
    display: none;
  }

  /* 보이는 상태 */
  .visible {
    display: block;
  }

  .review-item__delete a {
      color: #666;
      text-decoration: none;
  }
  .review-item__delete a:hover .fa-trash-can {
      color: #ff0000;
      transition: color 0.2s ease;
  }
  .review-item__update a {
      color: #666;
      text-decoration: none;
  }
  .review-item__update a:hover .fa-edit {
      color: #2838e3;
      transition: color 0.2s ease;
  }  
  .top-button-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
</style>