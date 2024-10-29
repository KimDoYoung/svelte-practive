<!-- src/routes/main/+page.svelte -->
<script lang="ts">
    // 메뉴 드롭다운 제어 상태
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
    }
</script>

<main class="container">
    <!-- Nav Bar -->
    <nav class="grid">
        <a href="/" class="contrast">MyApp</a>
        <ul>
            <li><a href="/main">Home</a></li>
            <li>
                <details>
                    <summary>Diary</summary>
                    <ul>
                        <li><a href="/main/diary">Diary Entry</a></li>
                    </ul>
                </details>
            </li>
        </ul>
    </nav>

    <!-- Main Content -->
    <section class="content">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main content of the page.</p>
    </section>
</main>

<style>
    /* Container styling */
    .container {
        padding: 1rem;
    }
    .content {
        text-align: center;
        margin-top: 2rem;
    }
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
    }
</style>
