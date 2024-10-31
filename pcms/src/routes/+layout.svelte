<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "$lib/styles/global.css";
    import NavBar from '$lib/components/NavBar.svelte';
</script>

<main class="container">
    <NavBar />
    <slot />
</main>