<!-- 
  사용방법 
  1. 위치에 <Alert bind:this={alertRef}/> 추가
  2. script에 let alertRef: Alert | null = null;
  3. alertRef?.showAlert("메시지", "info", 3000); 호출
  4. info, success, warning, error 4가지 중 1개의 타입
 -->

<script lang="ts">
  // 알림 메시지
  // 알림 타입 (info, success, warning, error 등)
  // 표시 시간 (기본값 3초)
  let { message='', type='info', duration = 3000 } = $props();
  let isVisible = $state(false); // 표시 여부

  // 컴포넌트 로드 시 실행
  export function showAlert(msg:string, alertType = "info", alertDuration = 3000) {
    message = msg;
    type = alertType;
    duration = alertDuration;
    isVisible = true;

    // 일정 시간 후 사라지게 설정
    setTimeout(() => {
      isVisible = false;
    }, duration);
  }
</script>

<div class="alert {type} {isVisible ? 'visible' : ''}">
  {message}
</div>

<style>
  /* 기본 스타일 (PicoCSS의 minimal 디자인 활용) */
  .alert {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.25rem;
    color: #fff;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }

  .alert.info { background-color: #007bff; } /* 파란색 */
  .alert.success { background-color: #28a745; } /* 초록색 */
  .alert.warning { background-color: #ffc107; } /* 노란색 */
  .alert.error { background-color: #dc3545; } /* 빨간색 */

  .alert.visible {
    opacity: 1;
  }
</style>

