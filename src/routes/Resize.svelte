<script context="module">
  import { Stage, Layer, Rect, Image } from "svelte-konva";
  
  export function createDraggableImage(imagePath) {
    var group = new Konva.Group({
        draggable: true,
       });
      var imageObj = new Image({
        src: imagePath,
        target: "MainCanvas"      
      });
      imageObj.onload = function () {
        var konvaImage = new Konva.Image({
          image: imageObj,
          width: this.width,
          height: this.height,
        });
        group.add(konvaImage);
        addAnchor(group, 0, 0, "topLeft");
        addAnchor(group, this.width, 0, "topRight");
        addAnchor(group, this.width, this.height, "bottomRight");
        addAnchor(group, 0, this.height, "bottomLeft");
      };
      imageObj.src = imagePath;

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
      var aspectRatio = width / height;

      var newWidth, newHeight;
      switch (activeAnchor.getName()) {
        case "topLeft":
          newWidth = topRight.x() - anchorX;
          newHeight = newWidth / aspectRatio;
          topLeft.y(anchorY);
          bottomLeft.x(anchorX);
          break;
        case "topRight":
          newWidth = anchorX - topLeft.x();
          newHeight = newWidth / aspectRatio;
          topLeft.y(anchorY);
          topRight.x(anchorX);
          break;
        case "bottomRight":
          newWidth = anchorX - topLeft.x();
          newHeight = newWidth / aspectRatio;
          bottomLeft.y(anchorY);
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

    // pill
    var pillImg = new Konva.Image({
      width: 200,
      height: 137,
    });

    // car crash
    var crashImg = new Konva.Image({
      width: 93,
      height: 104,
    });

    var pillGroup = new Konva.Group({
      x: 180,
      y: 50,
      draggable: true,
    });
    layer.add(pillGroup);
    pillGroup.add(pillImg);
    addAnchor(pillGroup, 0, 0, "topLeft");
    addAnchor(pillGroup, 200, 0, "topRight");
    addAnchor(pillGroup, 200, 138, "bottomRight");
    addAnchor(pillGroup, 0, 138, "bottomLeft");

    var crashGroup = new Konva.Group({
      x: 20,
      y: 110,
      draggable: true,
    });
    layer.add(crashGroup);
    crashGroup.add(crashImg);
    addAnchor(crashGroup, 0, 0, "topLeft");
    addAnchor(crashGroup, 93, 0, "topRight");
    addAnchor(crashGroup, 93, 104, "bottomRight");
    addAnchor(crashGroup, 0, 104, "bottomLeft");

    var imageObj1 = new Image();
    imageObj1.onload = function () {
      pillImg.image(imageObj1);
    };
    imageObj1.src = "images/pill.png";

    var imageObj2 = new Image();
    imageObj2.onload = function () {
      crashImg.image(imageObj2);
    };
    imageObj2.src = "images/carcrash.png";

    // Delete image on right-click
    pillGroup.on("contextmenu", function (e) {
      e.evt.preventDefault(); // Prevent default right-click menu
      deleteImage(pillGroup);
    });

    crashGroup.on("contextmenu", function (e) {
      e.evt.preventDefault(); // Prevent default right-click menu
      deleteImage(crashGroup);
    });
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
