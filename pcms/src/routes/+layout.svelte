<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "$lib/styles/global.css";
    import { page } from '$app/stores';
    import NavBar from '$lib/components/NavBar.svelte';
    const titles = {
      '/': '',
      '/diary': 'Diary',
      '/calendar': 'Calendar',
      '/snote': 'Snote',
      '/movie/review': 'Movie Review',
      '/movie/dvd': 'Movie DVD',
      '/movie/hdd': 'Movie HDD',
      '/jangbi': 'Jangbi',
    };
    $page.url.pathname;
    const currentPageTitle = $derived(titles[$page.url.pathname as keyof typeof titles]);
</script>

<main class="container">
    <NavBar {currentPageTitle} />
    <slot/>
</main>