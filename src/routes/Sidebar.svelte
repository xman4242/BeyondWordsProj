<script>
  import { metadata } from '../metadata.js';
  let selectedImagePath = '';

  function imageClicked(key) {
    // Handle the click event for the image with the given key
    const clickedImage = metadata[key];
    
    // Set the selectedImagePath variable to the path of the clicked image
    selectedImagePath = clickedImage.path;
    
    // You can now access the clicked image's information
    console.log(`Clicked on image with title: ${clickedImage.title}`);
    console.log(`Image path: ${clickedImage.path}`);
  }
</script>

<section>
  <div class="sidebar-container">
    {#each Object.keys(metadata) as key}
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      {#if metadata[key].path}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img src={metadata[key].path} alt={metadata[key].title} on:click={() => imageClicked(key)} />
        <p>{metadata[key].title}</p>
      {/if}
    {/each}
  </div>
</section>

<style>
  .sidebar-container {
    top: 0;
    left: 0;
    width: 200px;
    background-color: rgba(171, 25, 25, 0.779);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .sidebar-container img {
    width: auto;
    height: 100px;
    margin-bottom: 10px;
  }
</style>