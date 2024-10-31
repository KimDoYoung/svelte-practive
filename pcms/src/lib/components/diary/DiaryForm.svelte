<!-- 파일명: src/lib/components/diary/DiaryForm.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    // Props로 초기값을 받을 필드
    export let ymd: string = '';
    export let content: string = '';
    export let summary: string = '';

    let files: File[] = [];
    const dispatch = createEventDispatcher();

    // 파일 추가
    function addFiles(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            files = [...files, ...Array.from(input.files)];
        }
    }

    // 파일 삭제
    function removeFile(index: number) {
        files = files.filter((_, i) => i !== index);
    }

    // 폼 제출
    async function submitForm() {
        const formData = new FormData();
        formData.append('ymd', ymd);
        formData.append('content', content);
        formData.append('summary', summary);
        files.forEach((file, index) => formData.append(`files[${index}]`, file));

        // submit 이벤트로 formData 전송
        dispatch('submit', formData);
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <label>
        Date (YYYYMMDD):
        <input type="text" bind:value={ymd} placeholder="20231030" required />
    </label>

    <label>
        Summary:
        <input type="text" bind:value={summary} required />
    </label>

    <label>
        Content:
        <textarea bind:value={content} required ></textarea>
    </label>

    <label>
        Files:
        <input type="file" multiple on:change={addFiles} />
    </label>

    <!-- 파일 미리보기 및 삭제 버튼 -->
    {#if files.length > 0}
        <ul>
            {#each files as file, index}
                <li>
                    {file.name}
                    <button type="button" on:click={() => removeFile(index)}>Remove</button>
                </li>
            {/each}
        </ul>
    {/if}

    <button type="submit">Submit</button>
</form>

<style>
    /* 스타일 유지 */
    label {
        display: block;
        margin: 0.5rem 0;
    }
    input, textarea {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
    }
    textarea {
        height: 250px; /* 원하는 높이로 설정 */
    }    
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
    }
</style>
