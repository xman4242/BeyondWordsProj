<script context="module">
  import { Stage, Layer, Rect, Image } from "svelte-konva";
  import { metadata, imgData } from "../metadata.js";
  import jsPDF from "jspdf";
  import { onDestroy } from "svelte";
  import Konva from "konva";

  export function saveAsPDF() {
    var stage = document.querySelector("canvas");
    var pdf = new jsPDF("landscape", "px", [stage.width, stage.height]);
    pdf.addImage(stage.toDataURL(), "PNG", 0, 0, stage.width, stage.height);
    pdf.save("stage.pdf");
  }

  export function createDraggableImage(imagePath) {
    console.log("Creating draggable image...");
    var group = new Konva.Group({
      draggable: true,
    });

    var newImage = document.createElement("img");
    newImage.src = imagePath;

    var tr = new Konva.Transformer();

    newImage.onload = function () {
      var aspectRatio = newImage.width / newImage.height;
      var scaledHeight = 200;
      var scaledWidth = scaledHeight * aspectRatio;
      var konvaImage = new Konva.Image({
        image: newImage,
        width: scaledWidth,
        height: scaledHeight,
      });
      group.add(konvaImage);

      layer.add(tr);
      tr.nodes([konvaImage]);

      stage.on("mouseover", function (e) {
        // Check if the clicked target is not the image
        if (e.target === stage) {
          tr.nodes([]);
        }

        if (e.target == konvaImage) {
          tr.nodes([konvaImage]);
        }
      });
    };

    group.on("contextmenu", function (e) {
      e.evt.preventDefault(); // Prevent default right-click behavior
      group.remove(); // Remove the image group from the layer
      tr.remove();
      layer.batchDraw(); // Redraw the layer
    });

    layer.add(group);
  }
</script>

<body>
  <div id="MainCanvas"></div>
  <script>
    var width = window.innerWidth - 200; // Subtracting 200px for the sidebar width
    var height = window.innerHeight;

    function update() {
      var image = group.findOne("Image");
    }

    var stage = new Konva.Stage({
      container: "MainCanvas",
      width: width,
      height: height,
    });

    var layer = new Konva.Layer();
    stage.add(layer);
  </script>
</body>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #f0f0f0;
  }
  #MainCanvas {
    height: 100%;
    width: 100%;
  }
</style>
