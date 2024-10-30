<!-- src/routes/main/+page.svelte -->
<script lang="ts">
    import NavBar from '$lib/components/NavBar.svelte';
</script>

<main class="container">
    <!-- Nav Bar -->
    <NavBar />
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
</style>
