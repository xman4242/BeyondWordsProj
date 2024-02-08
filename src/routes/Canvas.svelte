<script>
  import { Stage, Layer, Rect, Image } from 'svelte-konva';
  import {onMount,tick} from 'svelte';

  
    const img = document.createElement('img');
    img.src = 'images/BackPain.png';
  
  
  
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
      <Image config={{ img }} />
  </Layer>
</Stage>