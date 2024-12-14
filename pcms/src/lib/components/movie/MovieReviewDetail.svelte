<!-- 파일명 : MovieReviewDetail.svelte -->
<script lang="ts">
	import StarLevel from "$lib/components/common/StarLevel.svelte";
  import type { MovieReviewItem } from "$lib/types";
	import { DateYmdUtil } from "$lib/utils";

  type MovieReviewDetailType = {
    review: MovieReviewItem;
    handleGoListButton: () => void;
  }
  let {review, handleGoListButton} :MovieReviewDetailType  = $props();
  let formattedYmd = $derived(DateYmdUtil.displayYmd(review.ymd));

</script>
<!-- html -->
<h1>{review.title}</h1>
<div> <StarLevel level={review.lvl}/></div>
<div class="sub-info">
    <span>{review.nara} ({review.year})</span>
    <span>감상일자 : {formattedYmd}</span>
    <a href="#none" aria-label="목록으로" onclick={handleGoListButton} title="목록으로">
      <i class="fa-solid fa-list"></i>
    </a>
</div>
<hr>
<div class="movie-content">
    {@html review.content}
</div>

<div class="button-area">
  <button onclick={handleGoListButton}>목록</button>
</div>
<style>
  .sub-info {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
    color: blue;
  }

  .sub-info a {
    margin-left: auto;
  }

  .movie-content {
    align-content: left;
    margin-bottom: 20px;
  }

  .button-area {
    display: flex;
    justify-content: flex-end;
  }
</style>