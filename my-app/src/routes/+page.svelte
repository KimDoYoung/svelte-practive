<script>
let title = 'Hello world!';
const changeTitle = () => {
    title = 'Hello SvelteKit!';
} 
import Title from '$lib/title.svelte';  
</script>
<Title title="콤포넌트연습"/>
<p class="red-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae modi dolor itaque numquam reiciendis voluptatum dolorem nisi voluptate commodi. Illo voluptas deleniti quis dicta rerum culpa, dolore voluptates minus esse?</p>
<button class="btn btn-primary" on:click={changeTitle}>button</button>
<input type="text" name="title" id="title" bind:value="{title}">
<a href="/diary">diary</a>
<style>

</style>
