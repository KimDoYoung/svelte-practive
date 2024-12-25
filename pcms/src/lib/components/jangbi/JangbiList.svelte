<!-- 파일명 : JangbiList.svelte -->
<script lang="ts">
  import { DateYmdUtil } from '$lib/utils/date_ymd_util';
  import { displayMoney } from '$lib/utils/commonUtils';
  import type { JangbiListResponse } from '$lib/types/jangbi';

  type JangbiListProps = {
    data: JangbiListResponse;
    handleView: (id: number) => void;
  };
  let {data, handleView} : JangbiListProps = $props();
  const lvlText = (lvl: string) => {
    if (lvl === "1") {
      return '😡 실망';
    } else if (lvl === "2") {
      return '🙁 보통';
    } else if (lvl === "3") {
      return '😃 만족';
    }
  }
  const clickView = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = target.dataset.id;
    if (id !== undefined) {
      handleView(Number(id));
    }
  }
</script>
<!-- html -->
{#each data.list as jangbi, index }
  <div class="jangbi-item-container">
    <div>{DateYmdUtil.displayYmdYoil(jangbi.ymd)}</div>
    <div class="col-item"><a href="#none" data-id="{jangbi.id}" onclick={clickView}>{jangbi.item}</a></div>
    <div class="col-lvl" class:text-blue={jangbi.lvl === "3"}>{lvlText(jangbi.lvl)}</div>
    <div class="col-location">{jangbi.location}</div>
    <div class="col-cost">{displayMoney(jangbi.cost?? 0)}</div>
  </div>
{/each}
<style>
  
  .jangbi-item-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .col-item {
    flex: 1;
    margin-left: 20px;
  }
  .col-location {
    flex: 1;
    margin-left: 20px;
  }
  .col-lvl {
    flex: 1;
    margin-left: 20px;
    text-align: center;
  }
  .col-cost {
    flex: 1;
    margin-right: 20px;
    text-align: right;
  }
  .text-blue {
    color: blue;
  }
</style>