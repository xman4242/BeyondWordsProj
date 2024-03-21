<script>
  import { metadata, imgData } from "../metadata.js";
  import Resize, { createDraggableImage } from "./Resize.svelte";

  function imageClicked(key) {
    // Handle the click event for the image with the given key
    imgData.clickedImg = metadata[key];

    // Set the selectedImagePath variable to the path of the clicked image
    let selectedImagePath = imgData.clickedImg.path;

    createDraggableImage(selectedImagePath);
  }
</script>

<section>
  <div class="sidebar-container">
    {#each Object.keys(metadata) as key}
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      {#if metadata[key].path}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="ImgContainer">
          <img
            src={metadata[key].path}
            alt={metadata[key].title}
            on:click={() => imageClicked(key)}
          />
          <p class="imgTitle">{metadata[key].title}</p>
        </div>
      {/if}
    {/each}
  </div>
</section>

<style>
  .sidebar-container {
    top: 0;
    left: 0;
    position: left;
    margin: auto;
    padding: 0;
    width: 200px;
    background-color: rgba(171, 25, 25, 0.779);
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 99;
    height: 100%;
    overflow-y: scroll;
  }
  .imgTitle {
    color: rgb(247, 247, 247);
    font-size: 1.5em;
    text-align: center;
  }
  .sidebar-container img {
    margin-bottom: 10px;
    height: auto;
    width: 75px;
  }
  .ImgContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
