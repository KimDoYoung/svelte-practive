<script lang="ts">
    import { writable } from 'svelte/store';

    export let message: string = '';  // 표시할 메시지
    export let keepSec: number = 3;   // 메시지가 유지될 시간 (초 단위)

    let displayMessage = writable('');  // 화면에 표시될 메시지 상태
    let messageType = 'info';           // 메시지 타입 ('warning', 'error', 'info')
    let timeout: ReturnType<typeof setTimeout>; // 타이머 ID 타입 설정

    // 메시지가 변경될 때 실행되는 반응성 구문
    $: {
        if (message && message.trim() !== "") { // message가 비어 있지 않을 때만 실행
            const [type, content] = message.split(/:(.+)/); // 유형과 내용 분리
            messageType = type.toLowerCase();               // 메시지 유형 설정
            displayMessage.set(content.trim());             // 메시지 내용 설정

            // 기존 타이머를 클리어하고 새 타이머 설정
            clearTimeout(timeout);
            timeout = setTimeout(() => displayMessage.set(''), keepSec * 1000);
        } else {
            displayMessage.set(''); // message가 빈 문자열이면 표시 메시지도 빈 상태로 설정
        }
    }
</script>


    <div class="message" class:warning={messageType === 'warning'} class:error={messageType === 'error'} class:info={messageType === 'info'}>
        {$displayMessage}
    </div>


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
