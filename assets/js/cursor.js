document.addEventListener("mousemove", function (event) {
  const cursorDiv = document.getElementById("cursor");
  cursorDiv.style.left = event.clientX + "px";
  cursorDiv.style.top = event.clientY + "px";
});
