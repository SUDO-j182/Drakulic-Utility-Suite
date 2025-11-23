console.log("Drakulic Utility Suite Loaded");

// Placeholder for tool switching logic
document.querySelectorAll(".tool-list button").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("Selected tool:", btn.dataset.tool);
  });
});
