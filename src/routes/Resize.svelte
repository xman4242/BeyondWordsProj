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
    newImage.src = imagePath;

    newImage.onload = function () {
      var konvaImage = new Konva.Image({
        image: newImage,
        width: this.width,
        height: this.height,
      });
      group.add(konvaImage);
      addAnchor(group, 0, 0, "topLeft");
      addAnchor(group, this.width, 0, "topRight");
      addAnchor(group, this.width, this.height, "bottomRight");
      addAnchor(group, 0, this.height, "bottomLeft");
      
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
          topRight.y(anchorY);
          topLeft.x(anchorX);
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

    var textNode = new Konva.Text({
        text: 'Some text here',
        x: 50,
        y: 80,
        fontSize: 20,
        draggable: true,
        width: 200,
      });

      layer.add(textNode);

      var tr = new Konva.Transformer({
        node: textNode,
        enabledAnchors: ['middle-left', 'middle-right'],
        // set minimum width of text
        boundBoxFunc: function (oldBox, newBox) {
          newBox.width = Math.max(30, newBox.width);
          return newBox;
        },
      });

      textNode.on('transform', function () {
        // reset scale, so only with is changing by transformer
        textNode.setAttrs({
          width: textNode.width() * textNode.scaleX(),
          scaleX: 1,
        });
      });

      layer.add(tr);

      textNode.on('dblclick dbltap', () => {
        // hide text node and transformer:
        textNode.hide();
        tr.hide();

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = textNode.absolutePosition();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
          x: stage.container().offsetLeft + textPosition.x,
          y: stage.container().offsetTop + textPosition.y,
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height =
          textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
          transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
          px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
          textarea.parentNode.removeChild(textarea);
          window.removeEventListener('click', handleOutsideClick);
          textNode.show();
          tr.show();
          tr.forceUpdate();
        }

        function setTextareaWidth(newWidth) {
          if (!newWidth) {
            // set width for placeholder
            newWidth = textNode.placeholder.length * textNode.fontSize();
          }
          // some extra fixes on different browsers
          var isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );
          var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
          if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
          }

          var isEdge =
            document.documentMode || /Edge/.test(navigator.userAgent);
          if (isEdge) {
            newWidth += 1;
          }
          textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
          // hide on enter
          // but don't hide on shift + enter
          if (e.keyCode === 13 && !e.shiftKey) {
            textNode.text(textarea.value);
            removeTextarea();
          }
          // on esc do not set value back to node
          if (e.keyCode === 27) {
            removeTextarea();
          }
        });

        textarea.addEventListener('keydown', function (e) {
          scale = textNode.getAbsoluteScale().x;
          setTextareaWidth(textNode.width() * scale);
          textarea.style.height = 'auto';
          textarea.style.height =
            textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
          if (e.target !== textarea) {
            textNode.text(textarea.value);
            removeTextarea();
          }
        }
        setTimeout(() => {
          window.addEventListener('click', handleOutsideClick);
        });
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
