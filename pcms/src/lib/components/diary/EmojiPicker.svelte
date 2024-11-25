<script lang="ts">
  let {textareaId} = $props(); // textarea의 id (외부에서 전달받음)

  let emojis = ['😊', '😂', '❤️', '😃','😱','😬','🚴‍♂️','🥺','😰','★']; // 기본 이모지 목록


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
  {#each emojis as emoji}
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
  }
  .emoji:hover {
    transform: scale(1.2);
  }
</style>

