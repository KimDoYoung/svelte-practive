<script lang="ts">
  type buttonClickProps = {
    nextClick: () => void;
    currentClick: () => void;
    prevClick: () => void;
  }

  let { nextClick, prevClick, currentClick } : buttonClickProps = $props() 

</script>

<div class="button-group">
  <button onclick={prevClick}>◁</button>
  <button onclick={currentClick}>Current</button>
  <button onclick={nextClick}>▷</button>
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