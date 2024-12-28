<!-- 파일명 : ImageCard.svelte.svelte -->
<script lang="ts">
import type { ApFile } from '$lib/types';
type ImageCardProps = {
  apfile: ApFile;
};
let {apfile} : ImageCardProps = $props();
</script>

<div class="card">
  <div class="image-wrapper">
      <a href="{apfile.url}" target="_blank"><img src={apfile.url} alt={apfile.file_name} /></a>
  </div>
  <div class="card-footer">
    <a href="#none" aria-label="삭제 버튼" class="icon-btn trash"><i class="fa-solid fa-trash trash"></i></a>
      <input type="text" placeholder="Enter text..." />
      <a href="#none" aria-label="저장 버튼" class="icon-btn save"><i class="fa-solid fa-save save"></i></a>
  </div>
</div>

<style>
  /* Base card styles */
  .card {
    height: 300px; /* 고정된 높이 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--card-border-color, #ccc);
    border-radius: 12px;
    overflow: hidden;
    background: var(--card-background, #fff);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%; /* 그리드 셀의 너비에 맞춤 */
}
  /* Image wrapper with responsive scaling */
  .image-wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 8px; /* Slight rounding inside */
      background: var(--image-background, #f8f8f8);
  }

  .image-wrapper img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain; /* Maintain aspect ratio without distortion */
  }

  /* Footer section */
  .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 0.5rem;
  }

  .card-footer input {
      flex: 1;
      margin: 0 0.5rem;
      padding: 0.3rem 0.6rem;
      border: 1px solid var(--input-border-color, #ccc);
      border-radius: 8px;
      font-size: 1rem;
      box-shadow: none; /* Override Pico default shadow */
  }

  /* Icon buttons */
  .icon-btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: none;
      border: none;
      color: var(--button-color, #333);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.4rem;
      border-radius: 50%;
      transition: background-color 0.2s ease;
  }

  .icon-btn:hover {
      background-color: var(--button-hover-color, #d5d2d2);
  }

  .icon-btn.trash {
      color: var(--trash-icon-color, #e63946);
  }

  .icon-btn.save {
      color: var(--save-icon-color, #2a9d8f);
  }

  /* Responsive behavior for small screens */
  @media (max-width: 500px) {
      .card {
          width: 100%;
          height: auto;
      }

      .card-footer {
          flex-direction: column;
      }

      .card-footer input {
          margin: 0.5rem 0;
      }
  }
</style>
