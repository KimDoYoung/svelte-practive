<!-- ============================================
파일명: src/lib/components/diary/DiarySearch.svelte 
설명: 다이어리 검색 컴포넌트
사용법: 
    <DiarySearch {ymd} />
=============================================== -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { faSearch } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    // 선택적 입력값을 정의
    export let start_ymd: string | null = null;
    export let end_ymd: string | null = null;
    export let search_text: string | null = null;

    const dispatch = createEventDispatcher();

    // 날짜를 YYYYMMDD 형식으로 변환하는 함수
    function formatDate(dateString: string | null): string | null {
        if (!dateString) return null;
        const date = new Date(`${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`);
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        const dd = date.getDate().toString().padStart(2, '0');
        return `${yyyy}${mm}${dd}`;
    }

    // 검색 버튼 클릭 시 이벤트 디스패치
    function handleSearch() {
        const formattedStartYmd = formatDate(start_ymd);
        const formattedEndYmd = formatDate(end_ymd);
        dispatch('search', { start_ymd: formattedStartYmd, end_ymd: formattedEndYmd, search_text });
    }
</script>

<div class="diary-search">
    <input type="date" bind:value={start_ymd} placeholder="시작 일자" />
    <input type="date" bind:value={end_ymd} placeholder="종료 일자" />
    <input type="text" bind:value={search_text} placeholder="검색어 입력" />

    <button on:click={handleSearch} class="search-button">
        <FontAwesomeIcon icon={faSearch} />
    </button>
</div>

<style>
 .diary-search {
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 8px;
    }

    input[type="date"],
    input[type="text"] {
        height: 40px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    .search-button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
    }

    .search-button:hover {
        background-color: #0056b3;
    }
</style>
