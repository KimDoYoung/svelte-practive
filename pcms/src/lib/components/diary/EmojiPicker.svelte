<script lang="ts">
  let {textareaId} = $props(); // textarea의 id (외부에서 전달받음)
  let pageIndex = $state(0); // 현재 페이지 번호

  //let emojis = ['😊', '😂', '😁', '😲', '😃','😱','😬','🥺','😰','🚴‍♂️','★','❤️','☂','☀','🌞','❄','☁','🌨️','☕','🍕']; // 기본 이모지 목록
  // emojis를 다중배열로 하고 pageIndex에 따라서 emojis를 바꿔주면 더 많은 이모지를 넣을 수 있음
  let emojes = [
    ['😊', '😂', '😁', '😲', '😃','😱','😬','🥺','😰','🚴‍♂️','❤️','☂','☀','🌞','❄','☁','🌨️','☕'],
    ['😭','😢','😨','👻','😫','😎','🥰','😝','🤑','🤐','😖','👿','😟','🤠','🤪','😛','😜']
  ];
  let currentIcons = $derived(emojes[pageIndex]);

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
</script>

<div class="emoji-picker">
  <a href="#none" class="emoji" onclick={() => { pageIndex = (pageIndex+1) % emojes.length }}>▷</a>
  {#each currentIcons as emoji}
    <a href="#none" class="emoji" onclick={() => insertEmoji(emoji)}>{emoji}</a>
  {/each}
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
</style>

