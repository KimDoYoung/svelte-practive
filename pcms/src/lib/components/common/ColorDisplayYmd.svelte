<script lang="ts">
  import { isSaterday, isSunday, displayYmd } from '$lib/utils';
  type Props  = {
    ymd: string;
    dateClick? : (ymd: string) => void | undefined;
  }
  

  let { ymd, dateClick} : Props = $props();

  function clickDate(event: Event) {
    if (dateClick) {
      dateClick(ymd);
    }
  }



</script>

{#if ymd && isSaterday(ymd)}
  <a href="#none" onclick={(e)=>clickDate(e)}><span class="text-saterday">{displayYmd(ymd, true)}</span></a>
{:else if ymd && isSunday(ymd)}
  <a href="#none" onclick={(e)=>clickDate(e)}><span class="text-sunday">{displayYmd(ymd, true)}</span></a>
{:else if ymd }
<a href="#none" onclick={(e)=>clickDate(e)}><span>{displayYmd(ymd, true)}</span></a>
{/if}

<style>
  .text-saterday {
    color: blue;
  }
  .text-sunday {
    color: red;
  }
</style>
