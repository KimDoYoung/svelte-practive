
<script>
    import Title from '$lib/title.svelte';
    export let data;
</script>

<h1 class="text-primary">Diary View</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, veniam!</p>

{data.title}
{#each data.posts as post}
    <p>{post.title}</p>
{/each}