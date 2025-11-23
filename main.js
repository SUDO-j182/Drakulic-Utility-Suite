console.log("Utility Suite Loaded");

const buttons = document.querySelectorAll(".tool-list button");
const panel = document.querySelector(".tool-panel");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tool = btn.dataset.tool;

    if (tool === "password") {
      renderPasswordTool();
    } else {
      renderPlaceholder(tool, btn.textContent);
    }
  });
});

function renderPlaceholder(toolKey, label) {
  panel.innerHTML = `
    <h2>${label}</h2>
    <p>This tool is coming soon.</p>
  `;
}

// ===== PASSWORD GENERATOR UI (UI ONLY, NO LOGIC YET) =====
function renderPasswordTool() {
  panel.innerHTML = `
    <h2>Password Generator</h2>
    <div class="tool-card">

      <div class="field">
        <label for="pw-length">Length</label>
        <div class="range-row">
          <input type="range" id="pw-length" min="4" max="32" value="12">
          <span id="pw-length-value">12</span>
        </div>
      </div>

      <div class="field options">
        <span>Include:</span>
        <label>
          <input type="checkbox" id="pw-lower" checked>
          Lowercase
        </label>
        <label>
          <input type="checkbox" id="pw-upper" checked>
          Uppercase
        </label>
        <label>
          <input type="checkbox" id="pw-numbers" checked>
          Numbers
        </label>
        <label>
          <input type="checkbox" id="pw-symbols">
          Symbols
        </label>
      </div>

      <div class="field">
        <label for="pw-output">Generated Password</label>
        <input type="text" id="pw-output" readonly>
      </div>

      <div class="actions">
        <button id="pw-generate">Generate</button>
        <button id="pw-copy">Copy</button>
      </div>

      <p id="pw-message" class="helper-text"></p>
    </div>
  `;
}
