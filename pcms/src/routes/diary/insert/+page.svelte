<!-- 파일명: src/routes/diary/insert/+page.svelte -->
<script lang="ts">
    import DiaryForm from '$lib/components/diary/DiaryForm.svelte';
    import { todayYmd } from '$lib/utils';
    let today = todayYmd();

</script>

<div class="diary-form">
    <h3>日志</h3>    
    <!-- DiaryForm 컴포넌트에 초기값을 전달하고 submit 이벤트를 수신 -->
    <DiaryForm ymd={today}  />
</div>
