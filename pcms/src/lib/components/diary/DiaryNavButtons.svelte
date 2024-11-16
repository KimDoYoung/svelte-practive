<script lang="ts">
  type buttonClickProps = {
    nextClick: () => void;
    currentClick: () => void;
    prevClick: () => void;
    hometext: string;
  }

  let { nextClick, prevClick, currentClick, hometext="Current" } : buttonClickProps = $props() 
 

</script>

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