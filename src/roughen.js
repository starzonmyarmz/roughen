const Style = require('sketch/dom').Style;

export default function(context) {

  const document       = context.document;
  const selectedLayer  = context.selection;
  const selectedCount  = selectedLayer.count();

  if (selectedCount === 1) {

    // Selected Layer
    const originalLayer = selectedLayer.firstObject();

    if (originalLayer && originalLayer.isKindOfClass(MSShapeGroup)) {

      // Get size and detail from user input
      const size   = document.askForUserInput_initialValue('Size (pixels)', '5');
      const detail = document.askForUserInput_initialValue('Detail (pixels)', '5');

      // Recreated Bezier Path
      const newPath = NSBezierPath.bezierPath();

      // Returns a random number (based on user input) near the exact point
      const randomPoint = function(num) {
        return num + (Math.random() * detail) - (detail / 2);
      };

      const originalPath = originalLayer.bezierPathWithTransforms();
      const steps        = originalPath.length() / size;
      const startPoint   = originalPath.pointOnPathAtLength(0);

      // Create the first point of the new path
      newPath.moveToPoint(NSMakePoint(startPoint.x, startPoint.y));

      // Loop through each step of the new path
      for (let i = 1; i <= steps; i++) {
        const point = originalPath.pointOnPathAtLength(size * i);

        // Create the new random point
        newPath.lineToPoint(NSMakePoint(randomPoint(point.x), randomPoint(point.y)));
      }

      // Close the new path
      newPath.closePath();

      // Create the new shape
      const newShape = MSShapeGroup.shapeWithBezierPath(newPath);

      // Make it black because I'm lazy
      var fill = newShape.style().addStylePartOfType(0);
      fill.color = MSColor.blackColor();

      // Add the new roughened shape to the document
      document.currentPage().addLayers([newShape]);

      // Remove the original shape
      document.currentPage().removeLayer(originalLayer);

    } else {
      document.showMessage('You can only roughen shapes and paths.');
    }
  } else {
    document.showMessage(`${selectedCount} shapes selected. Please only select one.`)
  }


}
