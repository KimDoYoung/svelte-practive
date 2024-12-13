<script lang="ts">
  import { flagMap } from '$lib/data/national_flags';
  let { country } = $props();
  
</script>

{#each country.split(',').map((name: string) => name.trim()) as c}
    <div class="national-flag" title={c}>
      <img src={flagMap[c]} alt="{c}의 국기" />
    </div>
{/each}

<style>
  .national-flag {
    display: inline-block;
    width: 32px; /* 아이콘 크기 */
    height: 32px;
  }

  .national-flag img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 박스에 맞춤 */
  }
</style>
