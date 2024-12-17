<!-- src/lib/components/NavBar.svelte -->
<script lang="ts">
    // 필요한 props나 상태가 있다면 여기서 정의
    let {currentPageTitle} = $props();
    const closeDropdown = () => {
        const dropdown = document.getElementById("movie-drop-down");
        if (dropdown) {
            dropdown.removeAttribute("open");
        }
    }
</script>

<nav class="bg-light">
    <a href="/" class="contrast">PCMS<strong>{#if currentPageTitle}-{currentPageTitle}{/if}</strong></a>
    <ul>
        <li><a href="/diary">Diary</a></li>
        <li><a href="/calendar">Calendar</a></li>
        <li><a href="/snote">Snote</a></li>
        <li><a href="/jangbi">Jangbi</a></li>
        <li>
          <details class="dropdown" role="list" id="movie-drop-down">
            <summary>Movie</summary>
            <ul dir="rtl">
              <li><a href="/movie/review" onclick={closeDropdown}>Review</a></li>
              <li><a href="/movie/dvd" onclick={closeDropdown}>DVD</a></li>
              <li><a href="/movie/hdd" onclick={closeDropdown}>Hdd</a></li>
            </ul>
          </details>
        </li>
    </ul>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
    }
    ul {
        list-style: none;
        display: flex;
        gap: 1rem;
    }
    a {
        text-decoration: none;
    }
</style>
