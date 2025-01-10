
<script lang="ts">
	import DiaryView from '$lib/components/diary/DiaryView.svelte';
  import {DateCounter, YoilEnum} from '$lib/components/common/DateCounter.svelte';
  import type { Ymd, DiaryDetailResponse } from '$lib/types';
  import { ModalManager } from "$lib/components/common/ModalManager.svelte";
	import AttachUploader from '$lib/components/common/AttachUploader.svelte';
  import { getFetch, deleteFetch } from '$lib/api';

  let {data} = $props();
  let ymd = $state(data.ymd);
  let diary = $state(data.diary);
  let dateCounter =  new DateCounter(ymd as Ymd, YoilEnum.Hangul);
  
  let modalManager = new ModalManager();
  const toggleAttachUploader = (event: Event) => {
    console.log('popupAttach');
    modalManager.toggleModal(event);
  }
  const fetchDiary = async () => {
      try {
          diary = await getFetch<DiaryDetailResponse>(`diary/${ymd}`);
          //console.log("response:", diary);
      } catch (error) {
        diary = {} as DiaryDetailResponse;
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      }
  } 
  const deleteDairy = ()=>{
    if (confirm('일기를 삭제하시겠습니까?')){
      let url = `diary/${ymd}`;
      deleteFetch(url).then((response)=>{
        console.log('response:', response);
        dateCounter.prev();
        ymd = dateCounter.ymd;
        
      }).catch((error)=>{
        console.error('일기 삭제 중 오류 발생:', error);
      });
    }
  }
  const uploadedImage = ()=>{
    console.log('uploadedImage');
    ymd = '';
    ymd = dateCounter.ymd;
  }
</script>
<div class="button-group">
  <button title="이전 일" onclick={()=>{dateCounter.prev(); ymd=dateCounter.ymd; fetchDiary()}}>◁</button>
  <button title="오늘" onclick={()=>{dateCounter.today(); ymd=dateCounter.ymd; fetchDiary()}}>○</button>
  <button title="다음 일" onclick={()=>{dateCounter.next(); ymd=dateCounter.ymd; fetchDiary()}}>▷</button>
  <button title="리스트로 이동" onclick={()=>{ window.location.href="/diary" }} aria-label="go list"><i class="fa-solid fa-list"></i></button>
  <button title="이미지파일올리기" onclick="{(event)=>toggleAttachUploader(event)}" data-target="diary-attach" aria-label="이미지 첨부하기"><i class="fa-regular fa-image"></i></button>
  <button title="삭제" onclick="{deleteDairy}"  aria-label="삭제"><i class="fa-solid fa-trash-can"></i></button>
</div>
<div>
  <DiaryView {diary} {ymd}/>
</div>
<AttachUploader target="일기" {ymd} modalId="diary-attach" {uploadedImage}/>
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
