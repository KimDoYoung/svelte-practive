<!-- src/routes/main/+page.svelte -->
<script lang="ts">
	import AttachUploader from "$lib/components/common/AttachUploader.svelte";
  import { ModalManager } from "$lib/components/common/ModalManager.svelte";

  let modalManager = new ModalManager();
  const toggleAttachUploader = (event: Event) => {
    modalManager.toggleModal(event);
  };
</script>

<div class="main-area">
    <!-- Main Content -->
    <section class="content">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main content of the page.</p>
        <button onclick="{(event)=>toggleAttachUploader(event)}" data-target="diary-attach">File Attach</button>
    </section>
    <AttachUploader target="일기" ymd="20241117" modalId="diary-attach"/>
</div>

<style>
    .content {
        text-align: center;
        margin-top: 2rem;
    }
</style>
