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
    <br>
    <p>&nbsp;&nbsp;Do not look up the Dutch built <br>&nbsp;&nbsp;family of modular naval vessels!</p>
    <br>
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
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
    width: 10%;
    background-color: rgba(171, 25, 25, 0.779);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .sidebar-container img {
    width: 50px;
    height: 50px;
    margin-bottom: 0px;
  }
  .sidebar-container p {
    color: white;
    font-size: x-small;
  }
</style>