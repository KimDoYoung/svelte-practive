<!-- src/routes/main/+page.svelte -->
<script lang="ts">
    import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="main-area">
    <!-- Main Content -->
    <section class="content">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main content of the page.</p>
    </section>
</div>

<style>
    .content {
        text-align: center;
        margin-top: 2rem;
    }
</style>
