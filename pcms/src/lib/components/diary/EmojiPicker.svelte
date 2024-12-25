<script lang="ts">
	import { getFetch } from "$lib/api";

  let {textareaId} = $props(); // textarea의 id (외부에서 전달받음)
  let pageIndex = $state(0); // 현재 페이지 번호
  //TODO 이미지 찾기 (kalpadbapi에서 처리하는게 좋을까?)
  //let emojis = ['😊', '😂', '😁', '😲', '😃','😱','😬','🥺','😰','🚴‍♂️','★','❤️','☂','☀','🌞','❄','☁','🌨️','☕','🍕']; // 기본 이모지 목록
  // emojis를 다중배열로 하고 pageIndex에 따라서 emojis를 바꿔주면 더 많은 이모지를 넣을 수 있음
  let emojes = [
    ['😊', '😂', '😁', '😲', '😃','😱','😬','🥺','😰','🚴‍♂️','❤️','☂','☀','🌞','❄','☁','🌨️','☕'],
    ['😭','😢','😨','👻','😫','😎','🥰','😝','🤑','🤐','😖','👿','😟','🤠','🤪','😛','😜'],
    ['🥕','🐟','🐠','🦈','🍔','🎵','📽','🖨']
  ];
  let currentIcons = $derived(emojes[pageIndex]);
  let mode = $state('list');

  // 이모지를 클릭했을 때 textarea에 삽입하는 함수
  function insertEmoji(emoji: string): void {
    // textareaId는 함수 외부에서 정의된 값
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;

    if (textarea) {
      const { selectionStart, selectionEnd, value } = textarea;

      if (selectionStart !== null && selectionEnd !== null) {
        // 커서 앞뒤로 텍스트를 분리하고 이모지를 삽입
        textarea.value = 
          value.slice(0, selectionStart) + emoji + value.slice(selectionEnd);

        // 삽입 후 커서를 이모지 뒤로 이동
        const cursorPosition = selectionStart + emoji.length;
        textarea.setSelectionRange(cursorPosition, cursorPosition);
        textarea.focus();
      }
    } else {
      console.warn(`Textarea with id "${textareaId}" not found.`);
    }
  }
  let searchInput: HTMLInputElement;
  let searchResult = $state<Record<string, any>>({});
  const handleKeydown = (event: KeyboardEvent) => {
      const searchInput = event.target as HTMLInputElement;
      const value = searchInput.value;
      if(value === '') {
        return;
      }
      if (event.key === 'Enter') {
        const url = '/emoji/search/keyword=' + searchInput.value;
        getFetch(url).then((res) => {
          console.log(res);
          searchResult = res as Record<string, any>;
          if (Object.keys(searchResult).length === 0) {
            console.log('검색 결과가 없습니다.');
            searchResult = {'x': '검색 결과가 없습니다.'};
          }
        });
      } else if (event.key === 'Escape') {
        mode = 'list';
      }
    };
</script>

<div class="emoji-picker">
  <a href="#none" class="emoji" onclick={() => { mode='list'; pageIndex = (pageIndex+1) % emojes.length }}>▷</a>
  <div class="emoji-list" class:invisible={mode !== 'list'} class:visible={mode === 'list'}>
  {#each currentIcons as emoji}
    <a href="#none" class="emoji" onclick={() => insertEmoji(emoji)}>{emoji}</a>
  {/each}
  </div>
  <a href="#none" class="emoji" onclick={() => {mode='search'; searchInput.focus();}} aria-label="Search Emoji"><i class="fa fa-search"></i></a>
  <div class="emoji-search" class:invisible={mode !== 'search'} class:visible={mode === 'search'}>
    <input type="text" placeholder="이모지 찾기" bind:this={searchInput} onkeydown={handleKeydown}/>
    {#if searchResult}
    {#each Object.entries(searchResult) as [key, emoji]}
        <a href="#none" class="emoji" onclick={() => insertEmoji(emoji)}>{emoji}</a>
      {/each}
    {/if}
  </div>  
</div>

<!-- 스타일링은 필요에 맞게 조정 가능 -->
<style>
  .emoji-picker {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  .emoji {
    cursor: pointer;
    font-size: 1.5rem;
    transition: transform 0.2s ease;
    text-decoration: none;
  }
  .emoji:hover {
    transform: scale(1.3);
  }
  .emoji-search {
    display: flex;
    gap: 0.5rem;
  }
  .visible {
    display: block;
  }
  .invisible {
    display: none;
  }
</style>

