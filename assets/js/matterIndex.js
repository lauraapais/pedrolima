// Aliases
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
} = Matter;

// Create engine
const engine = Engine.create();
const world = engine.world;

// Create renderer
const render = Render.create({
  element: document.body,
  canvas: document.getElementById("world"),
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "rgba(0, 0, 0, 0)",
  },
});
Render.run(render);

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

// Add walls
const wallThickness = 50;
const walls = [
  Bodies.rectangle(
    window.innerWidth / 2,
    -wallThickness / 2,
    window.innerWidth,
    wallThickness,
    { isStatic: true }
  ), // top wall
  Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight + wallThickness / 2,
    window.innerWidth,
    wallThickness,
    { isStatic: true }
  ), // bottom wall
  Bodies.rectangle(
    -wallThickness / 2,
    window.innerHeight / 2,
    wallThickness,
    window.innerHeight,
    { isStatic: true }
  ), // left wall
  Bodies.rectangle(
    window.innerWidth + wallThickness / 2,
    window.innerHeight / 2,
    wallThickness,
    window.innerHeight,
    { isStatic: true }
  ), // right wall
];
Composite.add(world, walls);

// Function to create a new box with a random image resized to fit within given dimensions and random rotation
function createBox(x, y, maxWidth, maxHeight) {
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images.splice(randomIndex, 1)[0]; // Remove the used image from the array
  getImageDimensions(randomImage.src, (originalDimensions) => {
    const { width, height } = resizeDimensions(
      originalDimensions.width,
      originalDimensions.height,
      maxWidth,
      maxHeight
    );
    const box = Bodies.rectangle(x, y, width, height, {
      render: {
        sprite: {
          texture: randomImage.src,
          xScale: width / originalDimensions.width,
          yScale: height / originalDimensions.height,
        },
      },
      angle: (Math.random() - 0.5) * Math.PI, // Random initial rotation within ±90 degrees
    });
    Composite.add(world, box);
  });
}



// Function to create a new text with random content and exact size
function createText(x, y) {
  const randomIndex = Math.floor(Math.random() * texts.length);
  const randomText = texts.splice(randomIndex, 1)[0]; // Remove the used text from the array
  const { width, height } = measureTextDimensions(randomText);

  const text = Bodies.rectangle(x, y, width, height, {
    isStatic: false,
    label: randomText,
    render: {
      fillStyle: "rgba(0, 0, 0, 0)", // Transparent fill
      strokeStyle: "rgba(0, 0, 0, 0)", // Transparent stroke
      lineWidth: 0, // No border
    },
  });

  Composite.add(world, text);
}

// Add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: false },
  },
});
Composite.add(world, mouseConstraint);

render.mouse = mouse;

document.addEventListener("mousedown", function (event) {
  const x = event.clientX;
  const y = event.clientY;
  const maxWidth = 300; // Maximum width for the images
  const maxHeight = 300; // Maximum height for the images

  // Check if there are any items left to add
  if (images.length === 0 && texts.length === 0) {
    return; // Stop adding items if lists are empty
  }

  if (Math.random() < 0.5 && images.length > 0) {
    createBox(x, y, maxWidth, maxHeight);
  } else if (texts.length > 0) {
    createText(x, y);
  }
});

const images = [
  { src: "assets/data/work/concerto_opera_traction_gulbenkian_foto_joaquim_damaso_ (233).jpg" },
  { src: "assets/data/about/about1.jpg" },
  { src: "assets/data/about/about2.jpg" },
  // Add more images as needed
];

const texts = [
  "Hello",
  "World",
  "This is text",
  "Random text",
  // Add more texts as needed
];

// Custom render function to draw text with rotation
Events.on(render, "afterRender", function () {
  const context = render.context;
  const allBodies = Composite.allBodies(world);

  context.font = '16px "Neue Haas Grotesk Text Pro", sans-serif';
  context.fillStyle = "#000";
  context.textAlign = "center"; // Center align the text
  context.textBaseline = "middle"; // Center baseline of the text
  context.fontWeight = "normal";

  for (let i = 0; i < allBodies.length; i++) {
    const body = allBodies[i];

    if (body.label && body.label !== "Rectangle Body") {
      // Save the current context state
      context.save();

      // Translate to the body's position
      context.translate(body.position.x, body.position.y);

      // Rotate the canvas to the body's angle
      context.rotate(body.angle);

      // Draw the text at the body's position
      context.fillText(body.label, 0, 0);

      // Restore the context to its original state
      context.restore();
    }
  }
});

// Function to measure the dimensions of the text
function measureTextDimensions(text, fontSize = "16px", fontFamily = '"Neue Haas Grotesk Text Pro", sans-serif') {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = `${fontSize} ${fontFamily}`;
  context.fontWeight = "normal";
  const metrics = context.measureText(text);
  const width = metrics.width;
  const height = parseInt(fontSize, 10); // Approximate height
  return { width, height };
}

// Function to load an image and get its original dimensions
function getImageDimensions(src, callback) {
  const img = new Image();
  img.onload = function () {
    callback({ width: img.width, height: img.height });
  };
  img.src = src;
}

// Function to calculate the new dimensions while maintaining aspect ratio
function resizeDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
  const aspectRatio = originalWidth / originalHeight;
  let width = maxWidth;
  let height = maxHeight;

  if (originalWidth > originalHeight) {
    height = Math.min(maxWidth / aspectRatio, maxHeight);
    width = height * aspectRatio;
  } else {
    width = Math.min(maxHeight * aspectRatio, maxWidth);
    height = width / aspectRatio;
  }

  return { width, height };
}
