<!-- src/lib/components/NavBar.svelte -->
<script lang="ts">
    // 필요한 props나 상태가 있다면 여기서 정의
    let {currentPageTitle} = $props();
</script>

<nav class="bg-light">
    <a href="/" class="contrast">PCMS{#if currentPageTitle}-{currentPageTitle}{/if}</a>
    <ul>
        <li><a href="/diary">Diary</a></li>
        <li><a href="/calendar">Calendar</a></li>
        <li><a href="/snote">Snote</a></li>
        <li>
          <details class="dropdown" role="list">
            <summary>Movie</summary>
            <ul>
              <li><a href="/movie/review">Review</a></li>
              <li><a href="/movie/dvd">DVD</a></li>
              <li><a href="/movie/hdd">Hdd</a></li>
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
