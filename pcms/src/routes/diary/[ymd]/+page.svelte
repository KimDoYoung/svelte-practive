
<script lang="ts">
	import DiaryView from '$lib/components/diary/DiaryView.svelte';
  import {DateCounter, YoilEnum} from '$lib/components/common/DateCounter.svelte';
  import { page } from '$app/stores';
	import type { Ymd } from '$lib/types';
  import { ModalManager } from "$lib/components/common/ModalManager.svelte";
	import AttachUploader from '$lib/components/common/AttachUploader.svelte';


  let ymd = $page.params.ymd;
  let dateCounter =  new DateCounter(ymd as Ymd, YoilEnum.Hangul);// $state<DateCounter>(new DateCounter(ymd as Ymd,YoilEnum.Hangul));
  
  let modalManager = new ModalManager();
  const toggleAttachUploader = (event: Event) => {
    console.log('popupAttach');
    modalManager.toggleModal(event);
  }
</script>
<div class="button-group">
  <button title="이전 일" onclick={()=>{dateCounter.prev(); ymd=dateCounter.ymd}}>◁</button>
  <button title="오늘" onclick={()=>{dateCounter.today(); ymd=dateCounter.ymd}}>○</button>
  <button title="다음 일" onclick={()=>{dateCounter.next(); ymd=dateCounter.ymd}}>▷</button>
  <button title="리스트로 이동" onclick={()=>{ history.back(); }} aria-label="go list"><i class="fa-solid fa-list"></i></button>
  <button title="리스트로 이동" onclick="{(event)=>toggleAttachUploader(event)}" data-target="diary-attach" aria-label="이미지 첨부"><i class="fa-regular fa-image"></i></button>
</div>
<div>
  <DiaryView ymd={ymd}/>
</div>
<AttachUploader target="일기" ymd={ymd} modalId="diary-attach"/>
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
