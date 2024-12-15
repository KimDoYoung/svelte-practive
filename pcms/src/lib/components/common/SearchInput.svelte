<!-- 파일명 : SearchInput.svelte -->
<script lang="ts">
  type SearchInputType = { 
    searchInputClick: (keyword: string) => void,
    placeholder_text: string
  }
  let { searchInputClick, placeholder_text }: SearchInputType = $props();
  const handleButtonClick = () => {
    const search = document.getElementById('search') as HTMLInputElement;
    // if(search.value === '') {
    //   alert('검색어를 입력해주세요.');
    //   return ;
    // }
    searchInputClick(search.value);
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      handleButtonClick();
    }
  }
</script>
<!-- html -->
<div class="search-area">
  <div class="input-wrapper">
    <input type="search" id="search" name="search" placeholder={placeholder_text} onkeydown={handleKeydown}>
    <button class="btn-search" type="button" aria-label="Search" onclick={handleButtonClick}>
      <i class="fa fa-search"></i>
    </button>
  </div>
</div>

<style>
  /* 부모 요소 설정 */
  .search-area {
    display: flex;
    justify-content: flex-start;
    margin: 20px;
  }
  
  /* 입력 필드와 버튼을 감싸는 Wrapper */
  .input-wrapper {
    position: relative;
    width: 100%;
  } 
  
  /* 입력 필드 스타일 */
  input[type="search"] {
    width: 100%;
    padding: 0.5rem 3rem 0.5rem 2.5rem; /* 버튼 공간 확보 */
    border: 1px solid #ccc;
    border-radius: 50px;
    font-size: 16px;
    box-sizing: border-box;
  }

  /* 버튼 스타일 */
  .btn-search {
    position: absolute;
    top: 35%;
    right: 10px; /* 버튼 위치 조정 */
    transform: translateY(-50%);
    border: none;
    background: rgb(150, 150, 216);
    color: white;
    padding: 0.7rem 0.7rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .btn-search:hover {
    background: blue;
  }
  
  /* 버튼 아이콘 크기 조정 */
  .btn-search i {
    font-size: 14px;
  }
</style>