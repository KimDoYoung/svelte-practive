<script>
  import { isSaterday, isSunday, displayYmd } from '$lib/utils';
  // let ymd = $props();
  let {ymd} = $props();
  //export let ymd; // props로 전달된 값을 받음
</script>
{#if ymd && isSaterday(ymd)}
<span class="text-saterday">{displayYmd(ymd, true)}</span>
{:else if ymd && isSunday(ymd)}
<span class="text-sunday">{displayYmd(ymd, true)}</span>
{:else if ymd }
<span>{displayYmd(ymd, true)}</span>
{/if}
<style>
  .text-saterday {
    color: blue;
  }
  .text-sunday {
    color: red;
  }
</style>
