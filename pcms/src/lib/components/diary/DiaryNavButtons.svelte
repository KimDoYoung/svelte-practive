<script lang="ts">
  type buttonClickProps = {
    nextClick: () => void;
    currentClick: () => void;
    prevClick: () => void;
    hometext: string;
  }

  let { nextClick, prevClick, currentClick, hometext="Current" } : buttonClickProps = $props() 
 

</script>
<!-- <button class="control-icon" on:click={loadDiaries} aria-label="Previous"><i class="fas fa-arrow-left"></i></button>
<button class="control-icon" on:click={loadDiaries} aria-label="Home"><i class="fas fa-circle"></i></button>
<button class="control-icon" on:click={loadDiaries} aria-label="next"><i class="fas fa-arrow-right"></i></button> -->


<div class="button-group">
  <button onclick={prevClick} title="previous ">◁</button>
  <button onclick={currentClick} title="{hometext}">{hometext}</button>
  <button onclick={nextClick} title="next">▷</button>
</div>

<style>
  .button-group {
      display: flex;
      gap: 0.5rem;
  }
  button {
      padding: 0.5rem 1rem;
      cursor: pointer;
  }
</style>