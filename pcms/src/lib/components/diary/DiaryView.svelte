<!-- ============================================
파일명: src/lib/components/diary/DiaryView.svelte 
설명: 다이어리 보기 컴포넌트
사용법: 
    <DiaryView {ymd} />
=============================================== -->
<script lang="ts">
  import { deleteFetch, getFetch } from '$lib/api';
  import type { DiaryDetailResponse, Ymd } from '$lib/types';
  import { displayContent, displayYmd } from '$lib/utils';
  import ColorDisplayYmd from '../common/ColorDisplayYmd.svelte';

  type DiaryViewType = {
    diary : DiaryDetailResponse | undefined,
    ymd : string
  }
    let { diary, ymd }: DiaryViewType = $props()  
  
  // let diary: DiaryDetailResponse | undefined = $state<DiaryDetailResponse | undefined>(undefined);

  $effect(() => {
      // console.log('ymd:', ymd);
      // fetchDiary(ymd);
  });
  // $inspect(()=>{
  //     console.log('diary:', diary);
  // })
  async function fetchDiary(ymd: string) {
      try {
          diary = await getFetch<DiaryDetailResponse>(`diary/${ymd}`);
          //console.log("response:", diary);
      } catch (error) {
        diary = undefined;
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      }
  } 
  //첨부된 이미지 삭제
  function deleteAttachImg(node_id:string){
    if (confirm('첨부 이미지를 삭제하시겠습니까?')){
      let url = `diary/attachments/${ymd}/${node_id}`;
      deleteFetch(url).then((response)=>{
        console.log('response:', response);
        fetchDiary(ymd);
      }).catch((error)=>{
        console.error('첨부 이미지 삭제 중 오류 발생:', error);
      });
    }
  }   

</script>
{#if diary}
    <p class="diary-summary"><ColorDisplayYmd ymd={diary.ymd}/> : {diary.summary}</p>
    <p class="diary-content">{@html displayContent(diary.content)}</p>
    {#if diary.attachments}
      <div class="container grid-responsive"> 
        {#each diary.attachments as attachment, index}
          <div class="diary-image-box">
            <img src='{attachment.url}' alt='{diary.ymd}  첨부이미지' />
            <div>
              <a href="#none" aria-label="첨부파일" onclick={()=>deleteAttachImg(attachment.node_id)} ><i class="fa-solid fa-trash-can trash-icon"></i></a>
            </div>  
          </div>  
        {/each}
      </div>  
    {/if}
{:else}
    <p>{displayYmd(ymd)} 데이터가 없습니다.</p>
{/if}
<style>
  .grid-responsive {
    display: grid;
    margin : 5px;
    gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 최소 300px */
  }

  .grid-responsive .diary-image-box {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px; /* 커스텀 반경 */
  }
  .trash-icon {
    color: #ff4d4d; /* 밝은 빨간색 */
  }
  .diary-summary{
    font-size: large;
    font-weight: bold;
    text-align: left;
  }
  .diary-content {
    white-space: pre-wrap;
    font-size: medium;
    text-align: left;
  }
</style>