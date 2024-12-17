<!-- 파일명 : JangbiList.svelte -->
<script lang="ts">
  import { DateYmdUtil } from '$lib/utils/date_ymd_util';
  import { displayMoney } from '$lib/utils/commonUtils';
  import type { JangbiListResponse } from '$lib/types/jangbi';

  type JangbiListProps = {
    data: JangbiListResponse;
  };
  let {data} = $props();
  const lvlText = (lvl: string) => {
    if (lvl === "1") {
      return '😡실망';
    } else if (lvl === "2") {
      return '🙁보통';
    } else if (lvl === "3") {
      return '😃만족';
    }
  }
</script>
<!-- html -->
{#each data.list as jangbi, index }
  <div class="jangbi-item-container">
    <div>{DateYmdUtil.displayYmd(jangbi.ymd)}</div>
    <div class="col-item">{jangbi.item}</div>
    <div class="col-lvl">{lvlText(jangbi.lvl)}</div>
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
</style>