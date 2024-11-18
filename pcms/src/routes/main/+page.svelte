<!-- src/routes/main/+page.svelte -->
<script lang="ts">
	import AttachUploader from "$lib/components/common/AttachUploader.svelte";

</script>

<div class="main-area">
    <!-- Main Content -->
    <section class="content">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main content of the page.</p>
        <div class="content">
            <AttachUploader target="일기" ymd="20241117"/>
        
        
    </section>
</div>

<style>
    .content {
        text-align: center;
        margin-top: 2rem;
    }
</style>
