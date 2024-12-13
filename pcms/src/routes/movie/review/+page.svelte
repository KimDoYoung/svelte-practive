<!-- 파일명 : +page.svelte -->
<!--
  파일명 : /review/+page.svelte
  영화감상평 검색
-->
<script lang="ts">
  import SearchInput from "$lib/components/common/SearchInput.svelte";
	// import type { MovieReviewListResponse } from "$lib/types";
	// import { load } from "../../+page.server";
  let {data}= $props();

  const searchInputClick = (keyword: string) => {
    console.log(keyword);
  }
  const handleNextButton = () => {
    console.log("다음버튼 클릭");
  }
  $effect(() => {
    console.log("영화감상평....effect");
    return () => {
      console.log("영화감상평.... cleanup");
    };
  });
</script>
<section>
  <SearchInput {searchInputClick} placeholder_text="Review 찾고자하는 키워드"/>
  {#if data.list.length === 0}
    <div>검색결과가 없습니다.</div>
  {:else}
    {#each data.list as review, index}
    <div class="review-item" id="{String(review.id)}">
      <div class="review-item__left">
        <div class="review-item__title">{review.title}</div>
      </div>
      <div class="review-item__right">
        <div class="review-item__nara">{review.nara}</div>
        <div class="review-item__year">{review.year}</div>
        <div class="review-item__lvl">
          {#each Array(5) as _, i}
            <span 
              class="star"
              class:filled={i < review.lvl}
              aria-hidden="true">
            </span>
          {/each}
        </div>
      </div>
    </div>    
    {/each}
    {#if (data.start_index > 0)}
      <button>이전</button>
    {/if}
    {#if data.next_data_exists}
      <button onclick={handleNextButton}>다음</button>
    {/if}
  {/if}
</section>
<style>
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

.star {
  width: 20px;
  height: 20px;
  display: inline-block;
  background: none;
  border: 1px solid rgb(212, 86, 13); /* 비어 있는 별의 테두리 */
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%, 
    79% 91%, 50% 70%, 21% 91%, 32% 57%, 
    2% 35%, 39% 35%
  ); /* 별 모양을 클리핑 */
}

.star.filled {
  background: rgb(217, 200, 104); /* 채워진 별 */
}
</style>