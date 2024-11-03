<!-- 파일명: src/routes/diary/insert/+page.svelte -->
<script lang="ts">
    import DiaryForm from '$lib/components/diary/DiaryForm.svelte';

    // 서버에 데이터 제출
    // async function handleSubmit(event: CustomEvent) {
    //     const formData = event.detail;

    //     try {
    //         const response = await fetch('/diary', {
    //             method: 'POST',
    //             body: formData
    //         });
    //         if (response.ok) {
    //             alert("Successfully submitted!");
    //         } else {
    //             console.error("Failed to submit data", await response.text());
    //         }
    //     } catch (error) {
    //         console.error("Error while submitting form", error);
    //     }
    // }
    let today = new Date();
    let todayYmd = today.toISOString().slice(0, 10).replace(/-/g, '');

</script>

<div class="diary-form">
    <h2>Diary Entry Form</h2>
    
    <!-- DiaryForm 컴포넌트에 초기값을 전달하고 submit 이벤트를 수신 -->
    <DiaryForm ymd={todayYmd}  />
</div>
