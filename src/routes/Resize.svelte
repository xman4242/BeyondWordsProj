<script>
  import { Stage, Layer, Rect, Image } from "svelte-konva";
  import { onMount } from "svelte";
</script>

<body>
  <div id="MainCanvas"></div>
  <script>
    var width = window.innerWidth;
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

      // update anchor positions
      switch (activeAnchor.getName()) {
        case "topLeft":
          topRight.y(anchorY);
          bottomLeft.x(anchorX);
          break;
        case "topRight":
          topLeft.y(anchorY);
          bottomRight.x(anchorX);
          break;
        case "bottomRight":
          bottomLeft.y(anchorY);
          topRight.x(anchorX);
          break;
        case "bottomLeft":
          bottomRight.y(anchorY);
          topLeft.x(anchorX);
          break;
      }

      image.position(topLeft.position());

      var width = topRight.x() - topLeft.x();
      var height = bottomLeft.y() - topLeft.y();
      if (width && height) {
        image.width(width);
        image.height(height);
      }
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
