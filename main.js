console.log("Utility Suite Loaded");

const buttons = document.querySelectorAll(".tool-list button");
const panel = document.querySelector(".tool-panel");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    panel.innerHTML = `
      <h2>${btn.textContent}</h2>
      <p>Tool content will load here.</p>
    `;
  });
});

