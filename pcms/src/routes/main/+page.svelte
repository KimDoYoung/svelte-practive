<!-- src/routes/main/+page.svelte -->
<script lang="ts">
	import Alert from "$lib/components/common/Alert.svelte";
	import AttachUploader from "$lib/components/common/AttachUploader.svelte";
  import { ModalManager } from "$lib/components/common/ModalManager.svelte";
	

  let modalManager = new ModalManager();
  const toggleAttachUploader = (event: Event) => {
    modalManager.toggleModal(event);
  };

  let alertRef: Alert | null = null;
  const showInfo = (msg: string) => {
    alertRef?.showAlert(msg, "error", 1000);
  };

</script>

<div class="main-area">
  <div>
    <Alert  bind:this = {alertRef} />
  </div>
  <!-- Main Content -->
  <section class="content">
      <h1>Welcome to the Main Page11</h1>
      <p>This is the main content of the page.</p>
      <button onclick="{(event)=>toggleAttachUploader(event)}" data-target="diary-attach">File Attach</button>
  </section>
  <AttachUploader target="일기" ymd="20241117" modalId="diary-attach"/>
  <button onclick={()=>{showInfo('우리는 민족 중흥의 역사적 사명을 띠고...')}}>Show Alert</button>
</div>


<style>
    .content {
        text-align: center;
        margin-top: 2rem;
    }
</style>
