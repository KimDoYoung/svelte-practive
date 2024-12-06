<!-- src/lib/components/NavBar.svelte -->
<script lang="ts">
    // 필요한 props나 상태가 있다면 여기서 정의
</script>

<nav class="bg-light">
    <a href="/" class="contrast">PCMS</a>
    <ul>
        <li><a href="/diary">Diary</a></li>
        <li><a href="/calendar">Calendar</a></li>
        <li><a href="/snote">Snote</a></li>
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
