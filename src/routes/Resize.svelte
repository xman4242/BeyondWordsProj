<script context="module">
  import { Stage, Layer, Rect, Image } from "svelte-konva";
  import { metadata, imgData } from "../metadata.js";
  import jsPDF from "jspdf";

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
    console.log("layer: ", layer);
    newImage.src = imagePath;

    newImage.onload = function () {
      var konvaImage = new Konva.Image({
        image: newImage,
        width: this.width,
        height: this.height,
      });
      group.add(konvaImage);

      var tr = new Konva.Transformer();
      layer.add(tr);
      tr.nodes([konvaImage]);

      stage.on("click", function (e) {
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

    function update(activeAnchor) {
      var group = activeAnchor.getParent();
      var topLeft = group.findOne(".topLeft");
      var topRight = group.findOne(".topRight");
      var bottomRight = group.findOne(".bottomRight");
      var bottomLeft = group.findOne(".bottomLeft");
      var image = group.findOne("Image");

      var anchorX = activeAnchor.x();
      var anchorY = activeAnchor.y();

      // calculate new width and height while maintaining aspect ratio
      var width = image.width() * image.scaleX();
      var height = image.height() * image.scaleY();
      var oldTopLeftX = topLeft.x();
      var oldTopLeftY = topLeft.y();

      var aspectRatio = width / height;

      var newWidth, newHeight;
      switch (activeAnchor.getName()) {
        case "topLeft":
          newWidth = bottomRight.x() - anchorX;
          newHeight = newWidth / aspectRatio;
          topLeft.x(anchorX);
          break;
        case "topRight":
          newWidth = anchorX - topLeft.x();
          newHeight = newWidth / aspectRatio;
          topLeft.y(anchorY);
          break;
        case "bottomRight":
          newWidth = anchorX - topLeft.x();
          newHeight = newWidth / aspectRatio;
          bottomRight.y(anchorY);
          bottomRight.x(anchorX);
          break;
        case "bottomLeft":
          newWidth = topRight.x() - anchorX;
          newHeight = newWidth / aspectRatio;
          bottomRight.y(anchorY);
          bottomLeft.x(anchorX);
          break;
      }

      image.width(newWidth);
      image.height(newHeight);

      // update the position of the anchors
      topLeft.position({ x: 0, y: 0 });
      topRight.position({ x: newWidth, y: 0 });
      bottomRight.position({ x: newWidth, y: newHeight });
      bottomLeft.position({ x: 0, y: newHeight });
    }

    function addAnchor(group, x, y, name) {
      var stage = group.getStage();
      var layer = group.getLayer();

      var anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: "#666",
        fill: "#ddd",
        strokeWidth: 2,
        radius: 8,
        name: name,
        draggable: true,
        dragOnTop: false,
        rotate: true,
      });

      anchor.on("dragmove", function () {
        update(this);
      });
      anchor.on("mousedown touchstart", function () {
        group.draggable(false);
        this.moveToTop();
      });
      anchor.on("dragend", function () {
        group.draggable(true);
      });
      anchor.on("rotate", function () {
        group.rotate(true);
      });
      // add hover styling
      anchor.on("mouseover", function () {
        var layer = this.getLayer();
        document.body.style.cursor = "pointer";
        this.strokeWidth(4);
      });
      anchor.on("mouseout", function () {
        var layer = this.getLayer();
        document.body.style.cursor = "default";
        this.strokeWidth(2);
      });
      group.add(anchor);
    }

    function deleteImage(group) {
      group.destroy();
      layer.draw();
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

<!-- <!DOCTYPE html>
<html>
<head>
    USE DEVELOPMENT VERSION -->
<!-- <script src="https://unpkg.com/konva@9.3.6/konva.min.js"></script>
    <meta charset="utf-8" />
    <title>Konva Transform Events Demo</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #f0f0f0;
        }
    </style>
</head> -->

<!-- <body>
<div id="container"></div>
<script>
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    var imageObj = new Image();
    imageObj.onload = function() {
        var Lizimage = new Konva.Image({
            x: 160,
            y: 60,
            width: 100,
            height: 90,
            image: imageObj,
            draggable: true,
        });
        layer.add(Lizimage);

        // create new transformer
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.nodes([Lizimage]);

        Lizimage.on('transformstart', function () {
            console.log('transform start');
        });

        Lizimage.on('dragmove', function () {
            updateText();
        });
        Lizimage.on('transform', function () {
            updateText();
            console.log('transform');
        });

        Lizimage.on('transformend', function () {
            console.log('transform end');
        });

        stage.on('click', function(e) {
            // Check if the clicked target is not the image
            if (e.target === stage) {
                tr.nodes([]);
            }

            if (e.target == Lizimage) {
                tr.nodes ([Lizimage]);
            }
        });
    };
    imageObj.src = "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";

    function updateText() {
        // Implement your update text logic here
    }
</script>
</body>
</html> -->

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
