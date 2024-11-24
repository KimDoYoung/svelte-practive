<script lang="ts">
  import { isSaterday, isSunday, displayYmd } from '$lib/utils';
  
  let { ymd}  = $props();
  
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
