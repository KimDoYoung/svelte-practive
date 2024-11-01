<!-- ============================================
파일: src/lib/components/common/MyMessage.svelte
설명: 메세지를 표시하고 일정시간 지나면 사라진다.
사용법: 
    <MyMessage {message} keepSec={3}/>
    let message = writable('info:ssss');  // `message`를 스토어로 설정
    message.set('info:저장되었습니다.'); 
=============================================== -->
<script lang="ts">
    import { writable } from 'svelte/store';

    // message를 스토어로 정의합니다.
    export let message = writable('');  
    export let keepSec: number = 3;     

    let messageType = 'info';           
    let timeout: ReturnType<typeof setTimeout>; 

    // 반응형 구문을 수정하여, message 값이 변경될 때 메시지 유형과 내용을 설정하고 타이머를 관리합니다.
    $: if ($message && $message.trim() !== "") { 
        const [type, content] = $message.split(/:(.+)/); // 유형과 내용 분리
        messageType = type.toLowerCase();                // 메시지 유형 설정
        message.set(content.trim());                     // 메시지 내용 설정

        // 기존 타이머를 초기화하고 새로운 타이머 설정
        clearTimeout(timeout);
        timeout = setTimeout(() => message.set(''), keepSec * 1000);
    }
</script>

{#if $message} <!-- $message가 비어있지 않을 때만 표시 -->
    <div class="message" class:warning={messageType === 'warning'} class:error={messageType === 'error'} class:info={messageType === 'info'}>
        {$message}
    </div>
{/if}

<style>
    .message {
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        transition: opacity 0.5s;
    }

    .warning {
        background-color: #f0ad4e;
    }

    .error {
        background-color: #d9534f;
    }

    .info {
        background-color: #5bc0de;
    }
</style>
