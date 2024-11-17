
<script lang="ts">
	import DiaryView from '$lib/components/diary/DiaryView.svelte';
  import {DateCounter, YoilEnum} from '$lib/components/common/DateCounter.svelte';
  // import { displayYmd, displayContent } from '$lib/utils';
  // import type { PageData } from './$types';
  // export let data: PageData; // PageData 타입을 통해 `data`가 안전하게 사용 가능
  // const { diary } = data;    
  import { page } from '$app/stores';
	import type { Ymd } from '$lib/types';

  let ymd = $state( $page.params.ymd);
  let dateCounter = $state<DateCounter>(new DateCounter(ymd as Ymd,YoilEnum.Hangul));
  // $effect(() => {
  //   ymd = $page.params.ymd;
  //   dateCounter = new DateCounter(ymd as Ymd,YoilEnum.Hangul);
  // });

</script>
<div class="button-group">
  <button onclick={()=>{dateCounter.prev(); ymd=dateCounter.ymd}}>◁</button>
  <button onclick={()=>{dateCounter.today(); ymd=dateCounter.ymd}}>○</button>
  <button onclick={()=>{dateCounter.next(); ymd=dateCounter.ymd}}>▷</button>
  <button onclick={()=>{ history.back(); }} aria-label="go list"><i class="fa-solid fa-list"></i></button>
</div>
<div>
  <DiaryView ymd={ymd}/>
</div>
<style>
  .button-group {
      display: flex;
      gap: 0.2rem;
  }
  button {
      padding: 0.5rem 1rem;
      cursor: pointer;
  }
</style>
