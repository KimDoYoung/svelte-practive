<!-- 파일명 : MovieDvdList.svelte -->
<script lang="ts">
  import type { MovieDvdListResponse } from '$lib/types';
  type MovieDvdListProps = {
    data: MovieDvdListResponse;
    handleSelectedRow: (id: number) => void;
  };
  let {data, handleSelectedRow} : MovieDvdListProps= $props();
</script>
<table class="striped overflow-auto text-small">
  <thead>
    <tr>
      <th scope="col">Id(DvdId)</th>
      <th scope="col">구분</th>
      <th scope="col">제목</th>
      <th scope="col">장르</th>
      <th scope="col">감독/년도/국가</th>
      <th scope="col">동작</th>
    </tr>
  </thead>
  <tbody>
    {#each data.list  as item, index }
      <tr>
        <th scope="row">{item.mid}({item.dvd_id})</th>
        <td>
          {#if item.gubun == 'M'}
            영화
          {:else}
            드라마
          {/if}
        </td>
        <td><a href="#none "aria-label="Edit" onclick={() => handleSelectedRow(item.id)}>{item.title1}</a>
          {#if item.title2}
            {item.title2} 
          {/if}
          {#if item.title3}
            {item.title3}
          {/if}
        </td>
        <td>{item.category}</td>
        <td>{item.gamdok}/{item.make_year}/{item.nara}</td>
        <td>
          <a href="#none" aria-label="Edit" onclick={() => handleSelectedRow(item.id)}><i class="fa fa-edit"></i></a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<style>
  .text-small {
    font-size: 0.8rem;
  }
</style>