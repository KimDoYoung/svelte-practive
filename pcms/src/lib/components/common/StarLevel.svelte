<script>
  let {level} = $props();

  // 별의 상태 배열 (true: 활성화, false: 비활성화)
  let stars = Array(5).fill(false).map((_, index) => index < level);

</script>
<div class="star-level">
  {#each stars as isFilled}
    <div class="star" class:filled={isFilled}>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="solid-star {isFilled ? 'filled' : 'hidden'}">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
    </div>
  {/each}
</div>

<style>
  .star-level {
    display: flex;
    gap: 4px; /* 별 간격 */
  }

  .solid-star {
    width: 24px;
    height: 24px;
  }

  .solid-star.hidden {
    visibility: hidden; /* 비활성 상태: 보이지 않지만 공간 유지 */
  }

  .solid-star.filled {
    fill: rgb(236, 209, 6); /* 활성 상태: 노란색 */
  }
</style>
