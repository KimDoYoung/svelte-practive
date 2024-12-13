<!-- 파일명 : +page.svelte -->
<!--
  파일명 : /review/+page.svelte
  영화감상평 검색
-->
<script lang="ts">
  import SearchInput from "$lib/components/common/SearchInput.svelte";
  import NationalFlag from "$lib/components/common/NationalFlag.svelte";
  import StarLevel from "$lib/components/common/StarLevel.svelte";
	import { getFetch } from "$lib/api.js";
	import type { MovieReviewListResponse } from "$lib/types";
	// import { load } from "../../+page.server";
  let {data}= $props();
  let mode = $state('list');
  let pageNo = 1;
  let search_text = "";


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
    });
  }

  const searchInputClick = (keyword: string) => {
    console.log("검색버튼 click " + keyword);
    search_text = keyword;
    pageNo = 1;
    loadPage();
  }
  const handleNextButton = () => {
    console.log("다음버튼 클릭");
    pageNo += 1;
    loadPage();
  }
  const handlePrevButton = () => {
    console.log("이전버튼 클릭");
    pageNo -= 1;
    if (pageNo < 1) {
      pageNo = 1;
    }
    loadPage();

  }
  const clickMovieReview = (e: MouseEvent) => {
    console.log("clickMovieReview", e);
    const target = e.target as HTMLElement;
    const id = target.getAttribute("data-id");
    console.log("id", id);
  }  
  $effect(() => {
    console.log("영화감상평....effect");
    return () => {
      console.log("영화감상평.... cleanup");
    };
  });
</script>
<section class="movie-review-list" class:visible={mode === 'list'} class:hidden={mode !== 'list'}>
  <SearchInput {searchInputClick} placeholder_text="Review 찾고자하는 키워드"/>
  {#if data.list.length === 0}
    <div>검색결과가 없습니다.</div>
  {:else}
    {#each data.list as review, index}
    <div class="review-item">
      <div class="review-item__left">
        <div class="review-item__title"><a href="#none" onclick={clickMovieReview} data-id="{review.id}">{review.title}</a></div>
      </div>
      <div class="review-item__right">
        <div class="review-item__nara"><NationalFlag country={review.nara}/></div>
        <div class="review-item__year">{review.year}</div>
        <div class="review-item__lvl"><StarLevel level={review.lvl}/></div>
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
<section class="movie-review-view"  class:visible={mode === 'edit'} class:hidden={mode !== 'edit'}>
1111
</section>
<style>
  a{
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
</style>