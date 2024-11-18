<script lang="ts">
  type buttonClickProps = {
    nextClick: () => void;
    currentClick: () => void;
    prevClick: () => void;
  }

  let { nextClick, prevClick, currentClick} : buttonClickProps = $props() 
 

</script>
<!-- <button class="control-icon" on:click={loadDiaries} aria-label="Previous"><i class="fas fa-arrow-left"></i></button>
<button class="control-icon" on:click={loadDiaries} aria-label="Home"><i class="fas fa-circle"></i></button>
<button class="control-icon" on:click={loadDiaries} aria-label="next"><i class="fas fa-arrow-right"></i></button> -->


<div class="button-group">
  <button onclick={prevClick} title="previous " aria-label="previous"><i class="fa-solid fa-square-caret-left"></i></button>
  <button onclick={currentClick} title="home" aria-label="today"><i class="fa-solid fa-calendar-day"></i></button>
  <button onclick={nextClick} title="next" aria-label="next"><i class="fa-solid fa-square-caret-right"></i></button>
</div>

<style>
  .button-group {
      display: flex;
      gap: 0.2rem;
  }
  button {
      padding: 0.5rem 1rem;
      cursor: pointer;
  }
</style>