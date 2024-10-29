<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';

	function handleLogin() {
		// 로그인 로직 없이 main 페이지로 이동
		goto('/main');
	}
</script>

<main>
	<h1>Login Page</h1>
	<button on:click={handleLogin}>Login</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;
	}
	button {
		padding: 10px 20px;
		font-size: 1rem;
		cursor: pointer;
	}
</style>
