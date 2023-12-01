<script>
  import { Stage, Layer, Image } from "svelte-konva";
  import { onMount } from "svelte";

  // an array of image URLs
  let images = [
    "https://i.imgur.com/4AiXzf8.jpeg",
    "https://i.imgur.com/DhygPot.jpg",
    "https://i.imgur.com/6vOahbP.jpg",
  ];

  // an array of image objects
  let imageObjects = [];

  // a function to load an image from a URL and return a promise
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      let image = new window.Image();
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(err);
    });
  }

  // a function to load all images and store them in imageObjects
  async function loadImages() {
    for (let url of images) {
      let image = await loadImage(url);
      imageObjects.push(image);
    }
  }

  // a function to handle the drag start event
  function handleDragStart(e) {
    // bring the dragged image to the top
    e.target.moveToTop();
  }

  // a function to handle the drag end event
  function handleDragEnd(e) {
    // update the position of the image object
    let index = e.target.index;
    imageObjects[index].x = e.target.x();
    imageObjects[index].y = e.target.y();
  }

  // load all images on mount
  onMount(() => {
    loadImages();
  });
</script>

<style>
  /* some style for the stage */
  .stage {
    border: 1px solid black;
    margin: 10px;
  }
</style>

<!-- the stage component -->
<Stage class="stage" width={500} height={500} backgroundColor="white">
  <!-- the layer component -->
  <Layer>
    <!-- loop through the image objects and render them as image components -->
    {#each imageObjects as image, index}
      <Image
        key={index}
        image={image}
        x={image.x || Math.random() * 400} 
        y={image.y || Math.random() * 400}
        draggable={true}
        on:dragstart={handleDragStart}
        on:dragend={handleDragEnd}
      />
    {/each}
  </Layer>
</Stage>